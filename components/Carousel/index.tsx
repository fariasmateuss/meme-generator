import { useEffect, useRef, useState } from 'react';

import { Image } from 'components/Base/Image';
import { DEFAULT_TRANSITION } from 'constants/transitions';

import { SLIDE_ANIMATION } from './animations';
import { CarouselProps } from './types';
import * as S from './styles';

export function Carousel({ templates, onSeletedTemplate }: CarouselProps) {
  const [width, setWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  return (
    <S.AnimetedContainer ref={carouselRef}>
      <S.AnimetedCarousel drag="x" dragConstraints={{ right: 0, left: -width }}>
        {templates.map(template => (
          <S.AnimetedSlide
            key={template.id}
            layoutId={template.id}
            variants={SLIDE_ANIMATION}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -2, transition: DEFAULT_TRANSITION }}
            whileTap={{ y: 2, transition: DEFAULT_TRANSITION }}
            onClick={() => onSeletedTemplate(template)}
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
          </S.AnimetedSlide>
        ))}
      </S.AnimetedCarousel>
    </S.AnimetedContainer>
  );
}
