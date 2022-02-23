import { FormEvent, useState, ChangeEvent } from 'react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import qs from 'qs';

import { Header } from 'components/Header';
import { LocalSwitcher } from 'components/LocaleSwitcher';
import { downloadImage } from 'utils/downloadImage';
import { Meme } from 'shared/types';
import { getMemes } from 'services/resources/getMemes';
import { api } from 'services/api';
import en from 'locales/en';
import pt from 'locales/pt';

import * as S from 'styles/pages/Home';

const IMGFLIP_PARAMS_USER_KEY = process.env.NEXT_PUBLIC_IMGFLIP_USER_ID;
const IMGFLIP_PARAMS_ACCESS_KEY = process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD;

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
  const [selectedTemplate, setSelectedTemplate] = useState<Meme | null>(null);
  const [boxes, setBoxes] = useState<number[]>([]);
  const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pt;

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: string,
  ) => {
    const newValues = boxes;
    newValues[index] = event.target.value;
    setBoxes(newValues);
  };

  function handleSelectTemplate(memes: Meme) {
    setSelectedTemplate(memes);
    setBoxes([]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: IMGFLIP_PARAMS_USER_KEY,
      password: IMGFLIP_PARAMS_ACCESS_KEY,
      boxes: boxes.map(text => ({ text })),
    });

    const resp = await api.get(`/caption_image?${params}`);
    const {
      data: { url },
    } = resp.data;

    setGeneratedMeme(url);
  }

  function handleReset() {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }

  return (
    <>
      <Head>
        <title>{t.hero}</title>
      </Head>

      <main>
        <LocalSwitcher />

        <S.Wrapper>
          <Header title={t.hero} alt={t.hero} />

          <S.Card>
            {generatedMeme && (
              <div>
                <img
                  src={generatedMeme}
                  alt="Generated Meme"
                  className="generated"
                />
                <S.Button type="button" onClick={handleReset}>
                  {t.recreate}
                </S.Button>

                <S.Button
                  type="button"
                  onClick={() => downloadImage(generatedMeme)}
                >
                  {t.download}
                </S.Button>
              </div>
            )}

            {!generatedMeme && (
              <>
                <h2>{t.title}</h2>
                <S.Templates>
                  {memes.map(meme => (
                    <S.Boxes
                      key={meme.id}
                      type="button"
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
                    <S.Form onSubmit={handleSubmit}>
                      {new Array(selectedTemplate.box_count)
                        .fill('')
                        .map((_, index) => (
                          <input
                            key={String(Math.random())}
                            placeholder={`${t.fields} #${index + 1}`}
                            onChange={e => handleInputChange(e, String(index))}
                          />
                        ))}

                      <S.Button type="submit">{t.create}</S.Button>
                    </S.Form>
                  </>
                )}
              </>
            )}
          </S.Card>
        </S.Wrapper>
      </main>
    </>
  );
}
