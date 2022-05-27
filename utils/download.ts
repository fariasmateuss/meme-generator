import axios from 'axios';
import noop from 'lodash.noop';

/**
 * Download image from URL with Axios
 * @param url The URL
 * @param name The image name
 */

export const download = (url: string, name: string) => {
  axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    })
    .catch(noop);
};
