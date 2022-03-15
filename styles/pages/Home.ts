import styled, { css } from 'styled-components';

export const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 560px) {
    margin: 0 0.75rem;
  }
`;

export const Logo = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  align-items: center;
  text-align: center;
  margin-top: 1.9rem;
  gap: 1rem;

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export const LogoTitle = styled.div`
  font-family: 'Luckiest Guy';
  font-size: 3.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  text-shadow: 0 4px 1px var(--title-shadow);
  ${({ theme }) => css`
    color: ${theme.title};
  `};

  @media screen and (max-width: 425px) {
    font-size: 2.25rem;
  }
`;

export const Card = styled.div`
  width: min(35rem, 100%);
  padding: 1.25rem;
  margin: 1.9rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 6px 0.62rem 0 rgba(0, 0, 0, 0.2);
  ${({ theme }) =>
    css`
      background: ${theme.modal};
    `};

  .generated {
    width: min(35rem, 100%);
    height: auto;
  }

  h2 {
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    ${({ theme }) =>
      css`
        color: ${theme.subtitle};
      `};

    @media screen and (max-width: 425px) {
      font-size: 1.25rem;
    }
  }
`;

export const Templates = styled.div`
  max-width: 100%;
  height: 10rem;
  border-radius: 0.5rem;
  overflow-y: auto;
  display: flex;
  align-items: center;
  padding: 0 0.35rem;
  margin-bottom: 1.5rem;
`;

export const Boxes = styled.div`
  position: relative;
  background: transparent;
  margin-right: 0.6rem;
  border: 2px solid transparent;

  &.selected {
    ${({ theme }) =>
      css`
        border-color: ${theme.button};
      `};
  }

  .template {
    width: auto;
    height: 8rem;
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    padding: 0 15px;
    margin-bottom: 0.62rem;
    font-size: 0.875rem;

    ${({ theme }) => css`
      background: ${theme.input.background};
      border: 1px solid ${theme.input.borderColor};
      color: ${theme.input.color};
    `}
  }
`;
