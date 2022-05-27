import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { captionMeme } from 'lib/imgflip';
import { Meme, ErrorResponse } from 'shared/apiSchema';

export function useCaptionMeme() {
  return useMutation<Meme, AxiosError<ErrorResponse>, string>(captionMeme);
}
