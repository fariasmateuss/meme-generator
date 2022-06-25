import { PropsWithChildren } from 'react';

import { ContainerProps } from './types';
import * as S from './styles';

export function Container({
  variant,
  children,
}: PropsWithChildren<ContainerProps>) {
  return <S.Wrapper variant={variant}>{children}</S.Wrapper>;
}
