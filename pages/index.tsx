import { FormEvent, useState, ChangeEvent } from 'react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import qs from 'qs';

import { Header } from 'components/Header';
import { api } from 'services/api';
import { getMemes } from 'services/resources/getMemes';
import { Meme } from 'shared/imgflipAPI';

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: string,
  ) => {
    const newValues = boxes;
    newValues[index] = e.target.value;
    setBoxes(newValues);
  };

  function handleSelectTemplate(memes: Meme) {
    setSelectedTemplate(memes);
    setBoxes([]);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    <main>
      <S.Wrapper>
        <Head>
          <title>Meme Generator</title>
        </Head>

        <Header />

        <S.Card>
          {generatedMeme && (
            <div>
              <img
                src={generatedMeme}
                alt="Generated Meme"
                className="generated"
              />
              <S.Button type="button" onClick={handleReset}>
                Create another meme
              </S.Button>

              <a href={generatedMeme} target="blank" download>
                <S.Button type="button">Download</S.Button>
              </a>
            </div>
          )}

          {!generatedMeme && (
            <>
              <h2>Pick up a thumbnail</h2>
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
                  <h2>Create your meme</h2>
                  <S.Form onSubmit={handleSubmit}>
                    {new Array(selectedTemplate.box_count)
                      .fill('')
                      .map((_, index) => (
                        <input
                          key={String(Math.random())}
                          placeholder={`Text #${index + 1}`}
                          onChange={e => handleInputChange(e, String(index))}
                        />
                      ))}

                    <S.Button type="submit">Generate</S.Button>
                  </S.Form>
                </>
              )}
            </>
          )}
        </S.Card>
      </S.Wrapper>
    </main>
  );
}
