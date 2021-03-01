import styled from 'styled-components';
import { shade } from 'polished';

export const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;

  img {
    width: 5.5rem;
    height: auto;
    border-radius: 1.25rem;
  }

  div {
    margin-left: 1rem;

    h1 {
      font-family: Bangers;
      font-size: 2.5rem;
      color: ${props => props.theme.colors.black};
    }
  }
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.white};
  max-width: 26.85rem;
  width: 100%;
  padding: 1.25rem;
  margin-top: 1.9rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 0.62rem 0 rgba(0, 0, 0, 0.2);

  .thumbnail {
    width: 24.3rem;
    height: auto;
  }

  h2 {
    font-size: 1.35rem;
    color: #24292e;
    margin-bottom: 0.6rem;
  }
`;

export const Templates = styled.div`
  max-width: 100%;
  height: 7rem;
  background: ${props => props.theme.colors.background};
  border-radius: 0.5rem;
  overflow-y: auto;
  display: flex;
  align-items: center;
  padding: 0 0.35rem;
  margin-bottom: 1.5rem;

  button {
    background: transparent;
    margin-right: 0.6rem;
    border: 2px solid transparent;

    &.selected {
      border-color: ${props => props.theme.colors.emerald};
    }

    img {
      width: 5rem;
      height: 5rem;
    }
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.colors.alto};
    padding: 0 15px;
    font-size: 0.875rem;
    margin-bottom: 0.62rem;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 2.4rem;
  border-radius: 8px;
  background: ${props => props.theme.colors.emerald};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.2s ease-in;
  font-size: 0.875rem;
  border: 2px solid transparent;

  &:hover {
    background: ${props => shade(0.2, props.theme.colors.emerald)};
  }

  &:nth-child(2) {
    margin: 0.62rem 0 0.62rem 0;
  }
`;
