import styled from 'styled-components';
import media from 'styled-media-query';

export const ToastContainer = styled.div`
  position: fixed;
  overflow: hidden;
  top: 20px;
  right: 20px;
  z-index: 110;

  ${media.lessThan('small')`
    left: 20px;
  `}
`;
