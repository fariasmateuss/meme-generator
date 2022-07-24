import { PropsWithChildren, useState } from 'react';

import { useRandomInterval } from 'hooks/useRandomInterval';
import { random } from 'utils/random';
import { range } from 'utils/range';

import { Sparkle } from './Sparkle';
import { SparklesProps } from './types';
import * as S from './styles';

const DEFAULT_COLOR = '#FFC700';

const generateSparkle = (color = DEFAULT_COLOR) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
    },
  };

  return sparkle;
};

export function Sparkles({
  children,
  ...delegated
}: PropsWithChildren<SparklesProps>) {
  const [sparkles, setSparkles] = useState(() =>
    range(3).map(() => generateSparkle()),
  );

  useRandomInterval({
    callback: () => {
      const sparkle = generateSparkle();
      const now = Date.now();
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });

      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },

    minDelay: 50,
    maxDelay: 450,
  });

  return (
    <S.Container {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}

      <S.Wrap>{children}</S.Wrap>
    </S.Container>
  );
}
