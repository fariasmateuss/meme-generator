import { useState } from 'react';
import Head from 'next/head';
import qs from 'qs';

import { Header } from '../components/Header';
import { PARAM_KEY_USER_ID, PARAM_KEY_PASSAWORD } from '../constants/params';

import { Wrapper, Card, Templates, Form, Button } from '../styles/pages/Home';

export default function Home({ memes }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const handleInputChange = index => e => {
    const newValues = boxes;
    newValues[index] = e.target.value;
    setBoxes(newValues);
  };

  function handleSelectTemplate(memes) {
    setSelectedTemplate(memes);
    setBoxes([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: `${PARAM_KEY_USER_ID}`,
      password: `${PARAM_KEY_PASSAWORD}`,
      boxes: boxes.map(text => ({ text })),
    });

    const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`);
    const {
      data: { url },
    } = await resp.json();

    setGeneratedMeme(url);
  }

  function handleReset() {
    setSelectedTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }

  return (
    <main>
      <Wrapper>
        <Head>
          <title>Meme Generator</title>
        </Head>

        <Header />

        <Card>
          {generatedMeme && (
            <div>
              <img
                src={generatedMeme}
                alt="Generated Meme"
                className="thumbnail"
              />
              <Button type="button" onClick={handleReset}>
                Create another meme
              </Button>

              <a href={generatedMeme} target="blank" download>
                <Button type="button">Download</Button>
              </a>
            </div>
          )}

          {!generatedMeme && (
            <>
              <h2>Pick up a thumbnail</h2>
              <Templates>
                {memes.map(meme => (
                  <button
                    key={meme.id}
                    type="button"
                    onClick={() => handleSelectTemplate(meme)}
                    className={
                      meme.id === selectedTemplate?.id ? 'selected' : ''
                    }
                  >
                    <img src={meme.url} alt={meme.name} />
                  </button>
                ))}
              </Templates>

              {selectedTemplate && (
                <>
                  <h2>Create your meme</h2>
                  <Form onSubmit={handleSubmit}>
                    {new Array(selectedTemplate.box_count)
                      .fill('')
                      .map((_, index) => (
                        <input
                          key={String(Math.random())}
                          placeholder={`Text #${index + 1}`}
                          onChange={handleInputChange(index)}
                        />
                      ))}

                    <Button type="submit">Generate</Button>
                  </Form>
                </>
              )}
            </>
          )}
        </Card>
      </Wrapper>
    </main>
  );
}

export const getStaticProps = async () => {
  const response = await fetch('https://api.imgflip.com/get_memes');
  const {
    data: { memes },
  } = await response.json();

  return {
    props: {
      memes,
    },

    revalidate: 60 * 60 * 24,
  };
};
