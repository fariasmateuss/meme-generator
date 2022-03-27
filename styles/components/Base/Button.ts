import { shade } from 'polished';
import styled, { css } from 'styled-components';

import RippleButton from 'components/RippleButton';

export const Button = styled(RippleButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.4rem;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 10px;
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

  &:not(:last-child) {
    margin: 0.68rem 0;
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
