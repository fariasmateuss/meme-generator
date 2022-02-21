import Image from 'next/image';

import { Wrapper } from 'styles/components/Header';

export function Header() {
  return (
    <Wrapper>
      <Image
        src="/logo.png"
        alt="Meme Generator Logo"
        objectFit="contain"
        width={90}
        height={90}
      />

      <h1>Meme Generator</h1>
    </Wrapper>
  );
}
