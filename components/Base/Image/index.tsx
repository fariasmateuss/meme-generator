import NextImage, { ImageProps } from 'next/image';

import { toBase64 } from 'utils/toBase64';

export const shimmer = (width: string | number, height: string | number) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#929292" offset="20%" />
      <stop stop-color="#858585" offset="50%" />
      <stop stop-color="#929292" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#929292" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export function Image({ src, width, height, ...rest }: ImageProps) {
  const isStatic = typeof src !== `string`;

  return (
    <NextImage
      src={src}
      width={width}
      height={height}
      blurDataURL={
        isStatic
          ? `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
          : src
      }
      placeholder="blur"
      {...rest}
    />
  );
}
