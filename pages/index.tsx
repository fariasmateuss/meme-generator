import { FormEvent, useState, ChangeEvent, useCallback } from 'react';
import { InferGetStaticPropsType } from 'next';
import { ClipLoader } from 'react-spinners';
import Head from 'next/head';
import Image from 'next/image';
import QueryString from 'qs';
import axios from 'axios';
import noop from 'lodash.noop';

import { Logo } from 'components/Logo';
import { Button } from 'components/Base/Button';
import { Header } from 'components/Layout/Header';
import { useI18nState } from 'contexts/i18n/I18Context';
import { getMemes } from 'services/resources/getMemes';
import { useMemes } from 'hooks/useMemes';
import { useShare } from 'hooks/useShare';
import { Template, Meme } from 'shared/apiSchema';
import { links } from 'constants/links';
import { api } from 'services/api';

import * as S from 'styles/pages/Home';

type Box = Template['box_count'];
type DownloadGeneratedMeme = Pick<Template, 'url' | 'name'>;

const loadingColorCss = 'var(--loading-color)';

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
    // eslint-disable-next-line no-console
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

  const { data: templates, isFetching } = useMemes({
    initialData: memes,
  });

  const { t } = useI18nState();

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

      const params = QueryString.stringify({
        template_id: selectedTemplate.id,
        username: process.env.NEXT_PUBLIC_IMGFLIP_USER_ID,
        password: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
        boxes: boxes.map(text => ({ text })),
      });

      try {
        setLoading(true);

        const payload = await api
          .post(`/caption_image?${params}`)
          .then(response => response.data.data);

        setGeneratedMeme(payload);
      } catch {
        throw new Error(
          'Something went wrong while add a caption to meme template...',
        );
      } finally {
        setLoading(false);
      }
    },
    [selectedTemplate, boxes, loading],
  );

  const handleReset = useCallback(() => {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }, []);

  const handleDownloadGeneratedMeme = useCallback(
    async ({ name, url }: DownloadGeneratedMeme) => {
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
    },
    [],
  );

  const share = useShare();
  const shareGeneratedMeme = useCallback(() => {
    share({
      url: generatedMeme.url,
      title: selectedTemplate.name,
      text: `${t.share.description} - ${links.website}`,
    });
  }, [generatedMeme, selectedTemplate, share, t]);

  return (
    <>
      <Head>
        <title>{t.heading.meme_generator}</title>
      </Head>

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
                className="generated"
                quality={100}
              />

              <Button
                type="reset"
                aria-label={t.buttons.recreate}
                onClick={handleReset}
              >
                {t.buttons.recreate}
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
                {t.buttons.download}
              </Button>
            </>
          )}

          {!generatedMeme && (
            <>
              <S.Container>
                <h2>{t.heading.pick_a_meme}</h2>

                {isFetching && <ClipLoader size={25} color={loadingColorCss} />}
              </S.Container>

              <S.Carousel>
                {templates.map(template => (
                  <S.Slide
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <img
                      src={template.url}
                      alt={template.name}
                      title={template.name}
                      aria-label={template.name}
                      className={`template 
                      ${template.id === selectedTemplate?.id ? 'selected' : ''}
                      `}
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
