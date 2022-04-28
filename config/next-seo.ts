const title = 'Recreate your favorite meme online';
const description =
  'Know your meme generator, browse the most popular memes, create your owm meme like Drake Hotline Bling, Two Buttons, Change My Mind';
const url = 'https://memegenerator.online';

export default {
  title,
  description,
  canonical: url,
  openGraph: {
    url,
    type: 'website',
    locale: 'en-CA',
    title,
    description,
    images: [
      {
        url: `${url}/static/banner.png`,
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    site: '@fariasmateuss',
    handle: '@fariasmateuss',
    cardType: 'summary_large_image',
  },
};
