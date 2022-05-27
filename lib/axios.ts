import axios from 'axios';

import { axiosErrorHandler } from 'middleware/errorHandler';

/**
 * Download image from URL
 * @param url The URL
 * @returns The image as a blob
 */

// eslint-disable-next-line consistent-return
export async function downloadImage(url: string) {
  try {
    const response = await axios(url, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/jpg',
      },
    });
    const { data } = response;

    return data as BlobPart;
  } catch {
    axiosErrorHandler(res => {
      if (res.type === 'axios-error') {
        const { message } = res.error;

        throw new Error(message);
      } else {
        throw new Error('Something went wrong while fetching image...');
      }
    });
  }
}
