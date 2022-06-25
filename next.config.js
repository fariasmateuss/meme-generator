module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });

    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    return config;
  },
  images: {
    domains: ['i.imgflip.com'],
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
};
