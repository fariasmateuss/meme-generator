import { useMutation } from 'react-query';

import { api } from 'config/client';

import { CaptionMeme } from './types';

async function captionMeme(url: string) {
  return api
    .post<CaptionMeme>(`/caption_image?${url}`)
    .then(response => response.data.data.url);
}

export function useCaptionMeme() {
  return useMutation(captionMeme);
}
