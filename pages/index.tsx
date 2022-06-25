import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';

import { getMemes } from 'hooks/useMemes';
import { HomePage } from 'layouts/Home';
import { useI18nState } from 'contexts/i18n/I18Context';
import { links } from 'constants/links';

export async function getStaticProps() {
  try {
    const templates = await getMemes();

    return {
      props: {
        templates,
      },

      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
}

export default function Home({
  templates,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useI18nState();

  return (
    <>
      <NextSeo
        title={t.heading.meme_generator}
        description={t.meta.description}
        canonical={links.website}
        openGraph={{
          url: links.website,
          type: 'website',
          locale: 'en-CA',
          title: t.meta.title,
          description: t.meta.description,
          images: [
            {
              url: `${links.website}/static/banner.png`,
              alt: t.meta.title,
              width: 1280,
              height: 720,
            },
          ],
        }}
      />

      <HomePage templates={templates} />
    </>
  );
}
