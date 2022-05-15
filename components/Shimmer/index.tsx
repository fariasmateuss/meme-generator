import { ShimmerProps } from './types';

export const Shimmer = ({ w, h }: ShimmerProps) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#929292" offset="20%" />
      <stop stop-color="#858585" offset="50%" />
      <stop stop-color="#929292" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#929292" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
