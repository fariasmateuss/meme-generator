import styled from 'styled-components';
import { shade } from 'polished';

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
`;

export const Card = styled.div`
  background: ${props => props.theme.white};
  max-width: 35rem;
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 0.62rem 0 rgba(0, 0, 0, 0.2);

  .thumbnail {
    max-width: 35rem;
    width: 100%;
    height: auto;
  }

  h2 {
    font-size: 1.35rem;
    color: ${props => props.theme.title};
    margin-bottom: 0.6rem;

    @media screen and (max-width: 425px) {
      font-size: 1.25rem;
    }
  }
`;

export const Templates = styled.div`
  max-width: 100%;
  height: 10rem;
  background: ${props => props.theme.background};
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
      border-color: ${props => props.theme.emerald};
    }

    img {
      width: auto;
      height: 8rem;
    }
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.alto};
    padding: 0 15px;
    font-size: 0.875rem;
    margin-bottom: 0.62rem;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 2.4rem;
  border-radius: 8px;
  border: 2px solid transparent;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props => props.theme.emerald};
  color: ${props => props.theme.white};
  transition: background 0.2s ease-in;

  &:hover {
    background: ${props => shade(0.2, props.theme.emerald)};
  }

  &:nth-child(2) {
    margin: 0.62rem 0 0.62rem 0;
  }
`;
