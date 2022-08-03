import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { animated } from 'react-spring';
import media from 'styled-media-query';

import { ToastMessageType } from 'shared/toasts';

type ContainerProps = {
  description?: string;
  type?: ToastMessageType;
};

type ContainerThemes = {
  [key in ToastMessageType]: FlattenSimpleInterpolation;
};

const containerThemes: ContainerThemes = {
  info: css`
    background: #d9edf7;
    &,
    svg {
      color: #3172b7;
    }
  `,

  success: css`
    background: #e7faf3;
    &,
    svg {
      color: #42977b;
    }
  `,

  error: css`
    background: #fddede;
    &,
    svg {
      color: #c53030;
    }
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  display: flex;
  max-width: 360px;
  border-radius: 10px;
  padding: 16px 30px 16px 16px;

  ${media.lessThan('small')`
    max-width: unset;
  `}

  & + div {
    margin-top: 16px;
  }

  svg {
    font-size: 20px;
  }

  > svg {
    margin: 4px 0 0 0;
  }

  ${({ type }) => containerThemes[type || 'info']}

  ${({ description }) =>
    !description &&
    css`
      align-items: center;

      > svg {
        margin-top: 0;
      }
    `}
`;

export const Notify = styled.div`
  flex: 1;
  margin: 0 10px 0 8px;

  p {
    margin-top: 4px;
    font-size: 0.875rem;
    opacity: 0.8;
    line-height: 20px;
  }
`;

export const Close = styled.button`
  position: absolute;
  right: 8px;
  top: 15px;
  opacity: 0.6;
  background: none;

  svg {
    margin-left: 15px;
  }
`;
