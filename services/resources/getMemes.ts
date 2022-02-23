import { api } from 'services/api';
import { Meme } from 'shared/types';

export async function getMemes() {
  try {
    const response = await api.get('/get_memes');

    const { memes } = response.data.data;

    return memes as Meme[];
  } catch {
    throw new Error('Failed to fetch memes...');
  }
}
