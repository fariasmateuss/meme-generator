import { FormEvent, useState, ChangeEvent, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { stringify } from 'qs';
import { useTheme } from 'styled-components';

import { Logo } from 'components/Logo';
import { Button } from 'components/Base/Button';
import { Sparkles } from 'components/Sparkles';
import { Header } from 'components/Layout/Header';
import { Container } from 'components/Layout/Container';
import { Loading } from 'components/Loading';
import { Image } from 'components/Base/Image';
import { useI18nState } from 'contexts/i18n/I18Context';
import { useToastsDispatch } from 'contexts/toasts/ToastsContext';
import { useCaptionMeme } from 'hooks/useCaptionMeme';
import { useDownloadFile } from 'hooks/useDownloadFile';
import { useMemes } from 'hooks/useMemes';
import { useShare } from 'hooks/useShare';
import { links } from 'constants/links';
import { Template } from 'shared/apiSchema';

import { Carousel } from './Carousel';
import { FORM_ANIMATION } from './animations';
import { HomeProps, Box, DownloadFile } from './types';
import * as S from './styles';

export function HomePage({ templates }: HomeProps) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);

  const color = useTheme();
  const share = useShare();

  const { t } = useI18nState();
  const { addToast } = useToastsDispatch();
  const { data, isFetching } = useMemes({
    initialData: templates,
  });
  const { mutate: captionMeme, isLoading: isCaptioning } = useCaptionMeme();
  const { mutate: downloadFile, isLoading: isDownloading } = useDownloadFile();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newValues = boxes;
      newValues[index] = event.target.value;
      setBoxes(newValues);
    },
    [boxes],
  );

  const handleSelectTemplate = useCallback((template: Template) => {
    setTemplate(template);
    setBoxes([]);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const url = stringify({
        template_id: template.id,
        username: process.env.NEXT_PUBLIC_IMGFLIP_USER_ID,
        password: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
        boxes: boxes.map(text => ({ text })),
      });

      captionMeme(url, {
        onError: () => {
          addToast({
            title: t.actions.errors.the_API_is_being_wiggly,
            description: t.actions.errors.lets_think_about_this_error,
            type: 'error',
          });
        },
        onSuccess: data => {
          setGeneratedMeme(data);
        },
      });
    },
    [template, boxes, addToast, t],
  );

  const handleReset = useCallback(() => {
    setTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }, []);

  const handleShareContent = useCallback(() => {
    share({
      url: generatedMeme,
      title: template.name,
      text: `${links.website} ${t.actions.share}`,
    });
  }, [generatedMeme, template, share, t]);

  const handleDownloadFile = useCallback(({ name, url }: DownloadFile) => {
    downloadFile(url, {
      onError: () => {
        addToast({
          title: t.actions.errors.the_API_is_being_wiggly,
          description: t.actions.errors.lets_think_about_this_error,
          type: 'error',
        });
      },
      onSuccess: data => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
      },
    });
  }, []);

  return (
    <>
      <Header />

      <S.Wrapper>
        <Logo />

        <AnimatePresence>
          {generatedMeme && (
            <Container variant="auto">
              <Image
                src={generatedMeme}
                alt={template.name}
                width={template.width}
                height={template.height}
                quality={100}
              />

              <Button
                type="reset"
                aria-label={t.buttons.generate_new}
                onClick={handleReset}
              >
                {t.buttons.generate_new}
              </Button>

              <Button
                type="button"
                aria-label={t.buttons.share}
                onClick={handleShareContent}
              >
                {t.buttons.share}
              </Button>

              <Button
                type="button"
                aria-label={t.buttons.download}
                disabled={isDownloading}
                loading={isDownloading}
                onClick={() =>
                  handleDownloadFile({
                    url: generatedMeme,
                    name: template.name,
                  })
                }
              >
                <Sparkles>{t.buttons.download}</Sparkles>
              </Button>
            </Container>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!generatedMeme && (
            <Container variant="full">
              <S.TitleWrap>
                <S.Heading>{t.heading.pick_a_meme}</S.Heading>

                {isFetching && (
                  <Loading icon={ClipLoader} size={25} color={color.loading} />
                )}
              </S.TitleWrap>

              <Carousel
                templates={data}
                onSeletedTemplate={handleSelectTemplate}
              />

              {template && (
                <motion.form variants={FORM_ANIMATION} onSubmit={handleSubmit}>
                  <S.Heading>{t.heading.customize_your_own}</S.Heading>

                  {new Array(template.box_count).fill('').map((_, index) => (
                    <S.Input
                      key={String(Math.random())}
                      placeholder={`${t.fields.placeholder} #${index + 1}`}
                      onChange={e => handleInputChange(e, index)}
                    />
                  ))}

                  <Button
                    type="submit"
                    aria-label={t.buttons.generate}
                    loading={isCaptioning}
                    disabled={isCaptioning}
                  >
                    {t.buttons.generate}
                  </Button>
                </motion.form>
              )}
            </Container>
          )}
        </AnimatePresence>
      </S.Wrapper>
    </>
  );
}
