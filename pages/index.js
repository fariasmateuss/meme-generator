import { useState } from 'react';
import Head from 'next/head';

import qs from 'qs';

import {
  Wrapper,
  Header,
  Card,
  Templates,
  Form,
  Button,
} from '../styles/pages/Home';

import logo from '../docs/resources/logo.jpg';

export default function Home({ memes }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const handleInputChange = index => e => {
    const newValues = boxes;
    newValues[index] = e.target.value;
    setBoxes(newValues);
  };

  // eslint-disable-next-line no-shadow
  function handleSelectTemplate(memes) {
    setSelectedTemplate(memes);
    setBoxes([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const params = qs.stringify({
      template_id: selectedTemplate.id,
      username: 'fariasmateuss',
      password: 'fariasmateuss',
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
    <Wrapper>
      <Head>
        <title>Meme Generator</title>
      </Head>

      <Header>
        <img src={logo} alt="Meme Generator Logo" />

        <div>
          <h1>Meme Generator</h1>
        </div>
      </Header>

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
          </div>
        )}

        {!generatedMeme && (
          <>
            <h2>Choose an image</h2>
            <Templates>
              {memes.map(meme => (
                <button
                  key={meme.id}
                  type="button"
                  onClick={() => handleSelectTemplate(meme)}
                  className={meme.id === selectedTemplate?.id ? 'selected' : ''}
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
  );
}

export const getServerSideProps = async () => {
  const response = await fetch('https://api.imgflip.com/get_memes');
  const {
    data: { memes },
  } = await response.json();

  return {
    props: {
      memes,
    },
  };
};
