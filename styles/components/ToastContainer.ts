import styled from 'styled-components';

export const ToastContainer = styled.div`
  position: fixed;
  overflow: hidden;
  top: 20px;
  right: 20px;
  z-index: 110;

  @media (max-width: 500px) {
    left: 20px;
  }
`;
