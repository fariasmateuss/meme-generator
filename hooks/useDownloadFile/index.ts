import axios from 'axios';
import { useMutation } from 'react-query';

async function downloadFile(url: string) {
  return axios(url, {
    responseType: 'arraybuffer',
  }).then(response => Buffer.from(response.data));
}

export function useDownloadFile() {
  return useMutation(downloadFile);
}
