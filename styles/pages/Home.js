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
    border-radius: 20px;
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
  max-width: 430px;
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  border-radius: 8px;
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 22px;
    color: #24292e;
    margin-bottom: 10px;
  }
`;

export const Templates = styled.div`
  max-width: 100%;
  height: 90px;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 30px;

  button {
    background: transparent;
    margin-right: 10px;
    border: 2px solid transparent;

    &.selected {
      border-color: ${props => props.theme.colors.emerald};
    }

    img {
      width: 53px;
      height: 53px;
    }
  }
`;

export const Form = styled.form`
  input {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.alto};
    padding: 0 15px;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.theme.colors.emerald};
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.2s ease-in;
  font-size: 14px;
  border: 2px solid transparent;

  &:hover {
    background: ${props => shade(0.2, props.theme.colors.emerald)};
  }
`;
