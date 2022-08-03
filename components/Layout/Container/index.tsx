import { PropsWithChildren } from 'react';

import { ANIMATION } from './animations';
import { ContainerProps } from './types';
import * as S from './styles';

export function Container({
  variant,
  children,
}: PropsWithChildren<ContainerProps>) {
  return (
    <S.AnimatedContainer
      variant={variant}
      variants={ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
    >
      {children}
    </S.AnimatedContainer>
  );
}
