import { FormEvent, useState, ChangeEvent, useCallback } from 'react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import QueryString from 'qs';

import { Logo } from 'components/Logo';
import { Button } from 'components/Base/Button';
import { Header } from 'components/Layout/Header';
import { useI18nState } from 'contexts/i18n/I18Context';
import { getMemes } from 'services/resources/getMemes';
import { useMemes } from 'hooks/useMemes';
import { downloadImage } from 'utils/downloadImage';
import { Template } from 'shared/apiSchema';
import { api } from 'services/api';

import * as S from 'styles/pages/Home';

type Box = Template['box_count'];

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
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useI18nState();

  const { data: templates } = useMemes({
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

  const handleGenerateMeme = useCallback(
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

        const { url } = await api
          .post(`/caption_image?${params}`)
          .then(response => response.data.data);

        setGeneratedMeme(url);
      } catch {
        throw new Error(
          'Something went wrong while add a caption to meme template...',
        );
      } finally {
        setLoading(false);
      }
    },
    [selectedTemplate, boxes],
  );

  const handleReset = useCallback(() => {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }, []);

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
                src={generatedMeme}
                alt={selectedTemplate.name}
                width={selectedTemplate.width}
                height={selectedTemplate.height}
                className="generated"
                quality={100}
              />

              <Button type="reset" onClick={handleReset}>
                {t.buttons.recreate}
              </Button>

              <Button
                type="button"
                onClick={() => downloadImage(generatedMeme)}
              >
                {t.buttons.download}
              </Button>
            </>
          )}

          {!generatedMeme && (
            <>
              <h2>{t.heading.pick_a_meme}</h2>

              <S.Templates>
                {templates.map(template => (
                  <S.Boxes
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
                  </S.Boxes>
                ))}
              </S.Templates>

              {selectedTemplate && (
                <>
                  <h2>{t.heading.customize_your_own}</h2>
                  <S.Form onSubmit={handleGenerateMeme}>
                    {new Array(selectedTemplate.box_count)
                      .fill('')
                      .map((_, index) => (
                        <input
                          key={String(Math.random())}
                          placeholder={`${t.fields.placeholder} #${index + 1}`}
                          onChange={e => handleInputChange(e, index)}
                        />
                      ))}

                    <Button type="submit" loading={loading} disabled={loading}>
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
