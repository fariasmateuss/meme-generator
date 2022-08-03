import { useQuery, UseQueryOptions } from 'react-query';

import { api } from 'config/client';
import { Template } from 'shared/apiSchema';

import { GetMemes } from './types';

export const GET_MEMES_QUERY_KEY = 'memes';

export async function getMemes() {
  return api
    .get<GetMemes>('/get_memes')
    .then(response => response.data.data.memes);
}

export function useMemes(options?: UseQueryOptions<Template[]>) {
  return useQuery<Template[]>(GET_MEMES_QUERY_KEY, getMemes, options);
}
