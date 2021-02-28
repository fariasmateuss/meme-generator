import Head from 'next/head';

import logo from '../docs/resources/logo.jpg';

import {
  Wrapper,
  Header,
  Card,
  Templates,
  Form,
  Button,
} from '../styles/pages/Home';

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Meme Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header>
        <img src={logo} alt="Meme Generator Logo" />

        <div>
          <h1>Meme Generator</h1>
        </div>
      </Header>

      <Card>
        <h2>Choose an image</h2>

        <Templates>
          <button type="button">
            <img src="" alt="" />
          </button>
          <button type="button">
            <img src="" alt="" />
          </button>
          <button type="button">
            <img src="" alt="" />
          </button>
          <button type="button">
            <img src="" alt="" />
          </button>
          <button type="button">
            <img src="" alt="" />
          </button>
          <button type="button">
            <img src="" alt="" />
          </button>
        </Templates>

        <h2>Create your meme</h2>

        <Form>
          <input type="text" placeholder="Title" />
        </Form>

        <Button type="submit">Generate</Button>
      </Card>
    </Wrapper>
  );
}
