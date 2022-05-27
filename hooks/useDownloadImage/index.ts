import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

import { downloadImage } from 'lib/axios';

export function useDownloadImage() {
  return useMutation<BlobPart, AxiosError, string>(downloadImage);
}
