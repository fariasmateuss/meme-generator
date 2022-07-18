import { PropsWithChildren } from 'react';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

import { Loading } from 'components/Loading';

import { ButtonProps } from './types';
import * as S from './styles';

export function Button({
  children,
  loading,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const theme = useTheme();

  return (
    <S.Button {...rest}>
      {loading ? (
        <Loading icon={PulseLoader} color={theme.text} size={10} />
      ) : (
        children
      )}
    </S.Button>
  );
}
