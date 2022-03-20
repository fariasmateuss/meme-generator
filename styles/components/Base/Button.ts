import { shade } from 'polished';
import styled, { css } from 'styled-components';

import RippleButton from 'components/RippleButton';

export const Button = styled(RippleButton)`
  width: 100%;
  height: 2.4rem;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 10px;
  border: 0;
  ${({ theme }) =>
    css`
      background-color: ${theme.button.background};
      color: ${theme.button.color};
    `};

  transition: background-color 200ms;

  &:hover {
    ${({ theme }) =>
      css`
        background: ${shade(0.2, theme.button.background)};
      `};
  }

  &:nth-child(2) {
    margin: 0.62rem 0;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  svg {
    margin-right: 8px;
  }

  &:hover {
    ${({ theme }) => css`
      background-color: ${shade(0.2, theme.button.background)};
    `}
  }
`;
