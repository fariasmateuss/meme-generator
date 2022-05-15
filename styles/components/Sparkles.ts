import styled, { keyframes } from 'styled-components';

const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  
  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
`;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(180deg);
  }
`;

export const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  width: inherit;
`;

export const SparkleWrapper = styled.span`
  position: absolute;
  display: block;
  animation: ${comeInOut} 700ms forwards;
`;

export const SparkleSvg = styled.svg`
  display: block;
  animation: ${spin} 1000ms linear;
`;

export const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
