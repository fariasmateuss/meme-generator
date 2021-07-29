import styled from 'styled-components';

export const Wrapper = styled.header`
  background: ${props => props.theme.white};
  height: 6.5rem;
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
  border-bottom: 1px solid ${props => props.theme['gray-100']};

  img {
    width: 80px;
    border-radius: 9px;
  }

  p {
    color: ${props => props.theme.gray};
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${props => props.theme['gray-100']};
  }
`;
