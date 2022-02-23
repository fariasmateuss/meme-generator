import axios from 'axios';

export async function downloadImage(url: string) {
  const response = await axios(url, { responseType: 'blob' });
  const generatedImage = URL.createObjectURL(response.data);
  const a = document.createElement('a');
  a.href = generatedImage;
  a.download = 'image.png';
  a.click();
}
