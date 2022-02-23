import Image from 'next/image';

import * as S from 'styles/components/Header';

type HeaderProps = {
  title: string;
  alt: string;
};

export function Header({ title, alt }: HeaderProps) {
  return (
    <S.Wrapper>
      <Image
        src="/logo.png"
        alt={alt}
        objectFit="contain"
        width={90}
        height={90}
      />

      <h1>{title}</h1>
    </S.Wrapper>
  );
}
