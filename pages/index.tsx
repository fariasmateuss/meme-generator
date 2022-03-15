import { FormEvent, useState, ChangeEvent, useCallback } from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import qs from 'qs';

import { Button } from 'components/Base/Button';
import { Header } from 'components/Layout/Header';
import { getMemes } from 'services/resources/getMemes';
import { downloadImage } from 'utils/downloadImage';
import { Meme } from 'shared/apiSchema';
import { api } from 'services/api';
import en from 'locales/en';
import pt from 'locales/pt';

import * as S from 'styles/pages/Home';

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
  const [selectedTemplate, setSelectedTemplate] = useState<Meme | null>(null);
  const [boxes, setBoxes] = useState<number[]>([]);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt;

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: string) => {
      const newValues = boxes;
      newValues[index] = event.target.value;
      setBoxes(newValues);
    },
    [boxes],
  );

  const handleSelectTemplate = useCallback((template: Meme) => {
    setSelectedTemplate(template);
    setBoxes([]);
  }, []);

  const handleGenerateMeme = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const params = qs.stringify({
        template_id: selectedTemplate.id,
        username: process.env.NEXT_PUBLIC_IMGFLIP_USER_ID,
        password: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
        boxes: boxes.map(text => ({ text })),
      });

      const resp = await api.post(`/caption_image?${params}`);
      const {
        data: { url },
      } = resp.data;

      setGeneratedMeme(url);
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
        <title>{t.hero}</title>
      </Head>

      <Header />

      <S.Wrapper>
        <S.Logo>
          <Image
            src="/static/logo.png"
            alt={t.hero}
            objectFit="contain"
            width={90}
            height={90}
          />

          <S.LogoTitle>{t.hero}</S.LogoTitle>
        </S.Logo>

        <S.Card>
          {generatedMeme && (
            <div>
              <img
                src={generatedMeme}
                alt="Generated Meme"
                className="generated"
              />

              <Button type="reset" onClick={handleReset}>
                {t.recreate}
              </Button>

              <Button
                type="button"
                onClick={() => downloadImage(generatedMeme)}
              >
                {t.download}
              </Button>
            </div>
          )}

          {!generatedMeme && (
            <>
              <h2>{t.title}</h2>
              <S.Templates>
                {memes.map(meme => (
                  <S.Boxes
                    key={meme.id}
                    onClick={() => handleSelectTemplate(meme)}
                    className={
                      meme.id === selectedTemplate?.id ? 'selected' : ''
                    }
                  >
                    <img
                      src={meme.url}
                      alt={meme.name}
                      title={meme.name}
                      className="template"
                    />
                  </S.Boxes>
                ))}
              </S.Templates>

              {selectedTemplate && (
                <>
                  <h2>{t.subtitle}</h2>
                  <S.Form onSubmit={handleGenerateMeme}>
                    {new Array(selectedTemplate.box_count)
                      .fill('')
                      .map((_, index) => (
                        <input
                          key={String(Math.random())}
                          placeholder={`${t.fields} #${index + 1}`}
                          onChange={e => handleInputChange(e, String(index))}
                        />
                      ))}

                    <Button type="submit">{t.create}</Button>
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
