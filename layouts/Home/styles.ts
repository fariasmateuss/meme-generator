import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.main`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  ${media.lessThan('medium')`
    margin: 0 0.75rem;
  `}
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.heading};

    ${media.lessThan('small')`
      font-size: 1.25rem;
    `}
  }
`;
