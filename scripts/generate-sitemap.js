const fs = require('fs');

const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/**/*{.tsx,.jsx,.js}',
    '!pages/_*{.tsx,.jsx,.js}',
    '!pages/api',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(page => {
            const path = page.replace('pages', '').replace('.tsx', '');
            const route = path === '/index' ? '' : path;
            return `
                    <url>
                      <loc>${`https://memegenerator.online${route}`}</loc>
                      <lastmod>${new Date().toISOString()}</lastmod>
                      <changefreq>monthly</changefreq>
                      <priority>1.0</priority>
                    </url>
                `;
          })
          .join('')}
    </urlset>
  `;

  fs.writeFileSync(
    'public/sitemap.xml',
    prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html',
    }),
  );
})();
