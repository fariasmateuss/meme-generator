import Head from 'next/head';

import { Wrapper } from '../styles/pages/Home';

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>Meme Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Meme Generator</h1>
      <p>Know Your Meme</p>
    </Wrapper>
  );
}
