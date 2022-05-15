import { FormEvent, useState, ChangeEvent, useCallback } from 'react';
import { InferGetStaticPropsType } from 'next';
import { ClipLoader } from 'react-spinners';
import { NextSeo } from 'next-seo';
import { stringify } from 'qs';
import Image from 'next/image';
import axios from 'axios';
import noop from 'lodash.noop';

import { Logo } from 'components/Logo';
import { Button } from 'components/Base/Button';
import { Shimmer } from 'components/Shimmer';
import { Sparkles } from 'components/Sparkles';
import { Header } from 'components/Layout/Header';
import { useI18nState } from 'contexts/i18n/I18Context';
import { useToastsDispatch } from 'contexts/toasts/ToastsContext';
import { useMemes } from 'hooks/useMemes';
import { useShare } from 'hooks/useShare';
import { Template, Meme } from 'shared/apiSchema';
import { toBase64 } from 'utils/toBase64';
import { links } from 'constants/links';
import { getMemes } from 'services/resources/getMemes';
import { api } from 'services/api';

import * as S from 'styles/pages/Home';

type Box = Template['box_count'];
type DownloadGeneratedMeme = Pick<Template, 'url' | 'name'>;

export async function getStaticProps() {
  try {
    const memes = await getMemes();

    return {
      props: {
        memes,
      },

      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}

export default function Home({
  memes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  );
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [generatedMeme, setGeneratedMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToastsDispatch();
  const { t } = useI18nState();

  const { data: templates, isFetching } = useMemes({
    initialData: memes,
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newValues = boxes;
      newValues[index] = event.target.value;
      setBoxes(newValues);
    },
    [boxes],
  );

  const handleSelectTemplate = useCallback((template: Template) => {
    setSelectedTemplate(template);
    setBoxes([]);
  }, []);

  const handleCaptionToTemplate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const params = stringify({
        template_id: selectedTemplate.id,
        username: process.env.NEXT_PUBLIC_IMGFLIP_USER_ID,
        password: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
        boxes: boxes.map(text => ({ text })),
      });

      try {
        setLoading(true);

        const payload = await api
          .post(`/caption_image?${params}`)
          .then(response => response.data.data)
          .catch(noop);

        setGeneratedMeme(payload);
      } catch {
        addToast({
          title: t.actions.errors.the_API_is_being_wiggly,
          description: t.actions.errors.lets_think_about_this_error,
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [selectedTemplate, boxes, loading, addToast, t],
  );

  const handleReset = useCallback(() => {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }, []);

  const handleDownloadGeneratedMeme = useCallback(
    async ({ name, url }: DownloadGeneratedMeme) => {
      try {
        const payload = await axios(url, {
          responseType: 'blob',
        })
          .then(response => response.data)
          .catch(noop);

        const generatedImage = URL.createObjectURL(payload);
        const a = document.createElement('a');
        a.href = generatedImage;
        a.download = name;
        a.click();
      } catch {
        addToast({
          title: t.actions.errors.the_server_is_being_foolish,
          description: t.actions.errors.lets_think_about_this_error,
          type: 'error',
        });
      }
    },
    [addToast, t],
  );

  const share = useShare();
  const shareGeneratedMeme = useCallback(() => {
    share({
      url: generatedMeme.url,
      title: selectedTemplate.name,
      text: `${links.website} ${t.actions.share}`,
    });
  }, [generatedMeme, selectedTemplate, share, t]);

  return (
    <>
      <NextSeo
        title={t.heading.meme_generator}
        description={t.meta.description}
        canonical={links.website}
        openGraph={{
          url: links.website,
          type: 'website',
          locale: 'en-CA',
          title: t.meta.title,
          description: t.meta.description,
          images: [
            {
              url: `${links.website}/static/banner.png`,
              alt: t.meta.title,
              width: 1280,
              height: 720,
            },
          ],
        }}
      />

      <Header />

      <S.Wrapper>
        <Logo />

        <S.Card>
          {generatedMeme && (
            <>
              <Image
                src={generatedMeme.url}
                alt={selectedTemplate.name}
                width={selectedTemplate.width}
                height={selectedTemplate.height}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  Shimmer({
                    w: selectedTemplate.width,
                    h: selectedTemplate.height,
                  }),
                )}`}
                className="generated"
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
                onClick={shareGeneratedMeme}
              >
                {t.buttons.share}
              </Button>

              <Button
                type="button"
                aria-label={t.buttons.download}
                onClick={() =>
                  handleDownloadGeneratedMeme({
                    url: generatedMeme.url,
                    name: selectedTemplate.name,
                  })
                }
              >
                <Sparkles>{t.buttons.download}</Sparkles>
              </Button>
            </>
          )}

          {!generatedMeme && (
            <>
              <S.Container>
                <h2>{t.heading.pick_a_meme}</h2>

                {isFetching && (
                  <ClipLoader size={25} color="var(--loading-color)" />
                )}
              </S.Container>

              <S.Carousel>
                {templates.map(template => (
                  <S.Slide
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <Image
                      src={template.url}
                      alt={template.name}
                      title={template.name}
                      aria-label={template.name}
                      width={130}
                      height={130}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        Shimmer({ w: 130, h: 130 }),
                      )}`}
                      layout="fixed"
                      objectFit="cover"
                      className="template"
                    />
                  </S.Slide>
                ))}
              </S.Carousel>

              {selectedTemplate && (
                <>
                  <h2>{t.heading.customize_your_own}</h2>
                  <S.Form onSubmit={handleCaptionToTemplate}>
                    {new Array(selectedTemplate.box_count)
                      .fill('')
                      .map((_, index) => (
                        <input
                          key={String(Math.random())}
                          placeholder={`${t.fields.placeholder} #${index + 1}`}
                          onChange={e => handleInputChange(e, index)}
                        />
                      ))}

                    <Button
                      type="submit"
                      aria-label={t.buttons.generate}
                      loading={loading}
                      disabled={loading}
                    >
                      {t.buttons.generate}
                    </Button>
                  </S.Form>
                </>
              )}
            </>
          )}
        </S.Card>
      </S.Wrapper>
    </>
  );
}
