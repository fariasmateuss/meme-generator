import { api } from 'services/api';
import { Template } from 'shared/apiSchema';

export async function getMemes() {
  try {
    const response = await api.get('/get_memes');
    const { memes } = response.data.data;

    return memes as Template[];
  } catch {
    throw new Error('Something went wrong while fetch memes...');
  }
}
