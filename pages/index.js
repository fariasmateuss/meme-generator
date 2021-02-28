import Head from 'next/head';

import logo from '../docs/resources/logo.jpg';

import { Wrapper, Header } from '../styles/pages/Home';

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Meme Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header>
          <img src={logo} alt="Meme Generator Logo" />

          <div>
            <h1>Meme Generator</h1>
          </div>
        </Header>
      </main>
    </Wrapper>
  );
}
