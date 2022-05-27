import { useQuery, UseQueryOptions } from 'react-query';

import { getMemes } from 'lib/imgflip';
import { Template } from 'shared/apiSchema';

export const GET_MEMES_QUERY_KEY = 'memes';

export function useMemes(options?: UseQueryOptions<Template[]>) {
  return useQuery<Template[]>(GET_MEMES_QUERY_KEY, getMemes, options);
}
