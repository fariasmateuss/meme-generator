/* eslint-disable consistent-return */
import { api } from 'config/client';
import { ErrorResponse, Meme, Template } from 'shared/apiSchema';
import { axiosErrorHandler } from 'middleware/errorHandler';

export async function getMemes() {
  try {
    const response = await api.get('/get_memes');
    const { memes } = response.data.data;

    return memes as Template[];
  } catch {
    axiosErrorHandler<ErrorResponse>(res => {
      if (res.type === 'axios-error') {
        const { error_message } = res.error.response.data;

        throw new Error(error_message);
      } else {
        throw new Error('Something went wrong while fetch memes...');
      }
    });
  }
}

export async function captionMeme(url: string) {
  try {
    const response = await api.post(`/caption_image?${url}`);
    const { data } = response.data;

    return data as Meme;
  } catch (error) {
    axiosErrorHandler<ErrorResponse>(res => {
      if (res.type === 'axios-error') {
        const { error_message } = res.error.response.data;

        throw new Error(error_message);
      } else {
        throw new Error('Something went wrong while captioning template');
      }
    });
  }
}
