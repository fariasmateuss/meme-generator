const url = 'https://memegenerator.online';

export default {
  canonical: url,
  openGraph: {
    type: 'website',
    url,
  },
  images: [
    {
      url: `${url}/static/banner.png`,
      width: 1280,
      height: 720,
    },
  ],
  twitter: {
    site: '@fariasmateuss',
    handle: '@fariasmateuss',
    cardType: 'summary_large_image',
  },
};
