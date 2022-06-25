import { useEffect, useRef, useState } from 'react';

import { Image } from 'components/Base/Image';

import { CarouselProps } from './types';
import * as S from './styles';

export function Carousel({ templates, onSeletedTemplate }: CarouselProps) {
  const [width, setWidth] = useState(0);

  const carouselRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  return (
    <S.Wrapper ref={carouselRef}>
      <S.Carousel drag="x" dragConstraints={{ right: 0, left: -width }}>
        {templates.map(template => (
          <S.Slide
            key={template.id}
            layoutId={template.id}
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
          </S.Slide>
        ))}
      </S.Carousel>
    </S.Wrapper>
  );
}
