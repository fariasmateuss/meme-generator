import {
  FormEvent,
  useState,
  ChangeEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { InferGetStaticPropsType } from 'next';
import { ClipLoader } from 'react-spinners';
import { NextSeo } from 'next-seo';
import { stringify } from 'qs';

import { Logo } from 'components/Logo';
import { Button } from 'components/Base/Button';
import { Sparkles } from 'components/Sparkles';
import { Header } from 'components/Layout/Header';
import { Loading } from 'components/Loading';
import { Image } from 'components/Base/Image';
import { useI18nState } from 'contexts/i18n/I18Context';
import { useToastsDispatch } from 'contexts/toasts/ToastsContext';
import { useCaptionMeme } from 'hooks/useCaptionMeme';
import { useDownloadImage } from 'hooks/useDownloadImage';
import { useMemes } from 'hooks/useMemes';
import { useShare } from 'hooks/useShare';
import { links } from 'constants/links';
import { getMemes } from 'lib/imgflip';
import { Template, Meme } from 'shared/apiSchema';

import * as S from 'styles/pages/Home';

type Box = Template['box_count'];

type Image = Pick<Template, 'url' | 'name'>;

export async function getStaticProps() {
  try {
    const memes = await getMemes();

    return {
      props: {
        memes,
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
  memes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState<Meme | null>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [width, setWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>();

  const share = useShare();

  const { t } = useI18nState();

  const { addToast } = useToastsDispatch();

  const { data: templates, isFetching } = useMemes({
    initialData: memes,
  });

  const { mutate: captionMeme, isLoading: isCaptioning } = useCaptionMeme();

  const { mutate: downloadImage, isLoading: isDownloading } =
    useDownloadImage();

  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const newValues = boxes;
      newValues[index] = event.target.value;
      setBoxes(newValues);
    },
    [boxes],
  );

  const handleSelectTemplate = useCallback((template: Template) => {
    setTemplate(template);
    setBoxes([]);
  }, []);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const url = stringify({
        template_id: template.id,
        username: process.env.NEXT_PUBLIC_IMGFLIP_USER_ID,
        password: process.env.NEXT_PUBLIC_IMGFLIP_PASSWORD,
        boxes: boxes.map(text => ({ text })),
      });

      captionMeme(url, {
        onError: () => {
          addToast({
            title: t.actions.errors.the_API_is_being_wiggly,
            description: t.actions.errors.lets_think_about_this_error,
            type: 'error',
          });
        },
        onSuccess: data => {
          setGeneratedMeme(data);
        },
      });
    },
    [template, boxes, addToast, t],
  );

  const handleReset = useCallback(() => {
    setTemplate(null);
    setBoxes([]);
    setGeneratedMeme(null);
  }, []);

  const shareContent = useCallback(() => {
    share({
      url: generatedMeme.url,
      title: template.name,
      text: `${links.website} ${t.actions.share}`,
    });
  }, [generatedMeme, template, share, t]);

  const handleDownload = useCallback(({ name, url }: Image) => {
    downloadImage(url, {
      onError: () => {
        addToast({
          title: t.actions.errors.the_API_is_being_wiggly,
          description: t.actions.errors.lets_think_about_this_error,
          type: 'error',
        });
      },
      onSuccess: data => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
      },
    });
  }, []);

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

      <Header />

      <S.Wrapper>
        <Logo />

        <S.Card>
          {generatedMeme && (
            <>
              <Image
                src={generatedMeme.url}
                alt={template.name}
                width={template.width}
                height={template.height}
                className="generated"
                quality={100}
              />

              <Button
                type="reset"
                aria-label={t.buttons.generate_new}
                onClick={handleReset}
              >
                {t.buttons.generate_new}
              </Button>

              <Button
                type="button"
                aria-label={t.buttons.share}
                onClick={shareContent}
              >
                {t.buttons.share}
              </Button>

              <Button
                type="button"
                aria-label={t.buttons.download}
                disabled={isDownloading}
                loading={isDownloading}
                onClick={() =>
                  handleDownload({
                    url: generatedMeme.url,
                    name: template.name,
                  })
                }
              >
                <Sparkles>{t.buttons.download}</Sparkles>
              </Button>
            </>
          )}

          {!generatedMeme && (
            <>
              <S.Container>
                <h2>{t.heading.pick_a_meme}</h2>

                {isFetching && (
                  <Loading
                    icon={ClipLoader}
                    size={25}
                    color="var(--loading-color)"
                  />
                )}
              </S.Container>

              <S.Carousel ref={carouselRef}>
                <S.Slide drag="x" dragConstraints={{ right: 0, left: -width }}>
                  {templates.map(template => (
                    <S.InnerItem
                      key={template.id}
                      layoutId={template.id}
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <Image
                        src={template.url}
                        alt={template.name}
                        title={template.name}
                        aria-label={template.name}
                        width={130}
                        height={130}
                        layout="fixed"
                        objectFit="cover"
                        className="template"
                      />
                    </S.InnerItem>
                  ))}
                </S.Slide>
              </S.Carousel>

              {template && (
                <>
                  <h2>{t.heading.customize_your_own}</h2>
                  <S.Form onSubmit={onSubmit}>
                    {new Array(template.box_count).fill('').map((_, index) => (
                      <input
                        key={String(Math.random())}
                        placeholder={`${t.fields.placeholder} #${index + 1}`}
                        onChange={e => handleInputChange(e, index)}
                      />
                    ))}

                    <Button
                      type="submit"
                      aria-label={t.buttons.generate}
                      loading={isCaptioning}
                      disabled={isCaptioning}
                    >
                      {t.buttons.generate}
                    </Button>
                  </S.Form>
                </>
              )}
            </>
          )}
        </S.Card>
      </S.Wrapper>
    </>
  );
}
