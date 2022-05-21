import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />

          <link
            rel="icon"
            type="image/x-icon"
            sizes="16x16 32x32 64x64 96x96"
            href="/favicons/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/favicons/favicon-64x64.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/favicons/favicon-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/favicons/favicon-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicons/favicon-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="152x152"
            href="/favicons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="167x167"
            href="/favicons/apple-touch-icon-167x167.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="180x180"
            href="/favicons/apple-touch-icon-180x180.png"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
