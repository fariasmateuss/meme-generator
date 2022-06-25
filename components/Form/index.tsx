import { useI18nState } from 'contexts/i18n/I18Context';
import { Button } from 'components/Base/Button';

import { FormProps } from './types';
import * as S from './styles';

export function Form({
  template,
  loading,
  onSubmit,
  onInputChange,
}: FormProps) {
  const { t } = useI18nState();

  return (
    <>
      <h2>{t.heading.customize_your_own}</h2>

      <S.Wrapper onSubmit={onSubmit}>
        {new Array(template.box_count).fill('').map((_, index) => (
          <input
            key={String(Math.random())}
            placeholder={`${t.fields.placeholder} #${index + 1}`}
            onChange={e => onInputChange(e, index)}
          />
        ))}

        <Button
          type="submit"
          aria-label={t.buttons.generate}
          loading={loading}
          disabled={loading}
        >
          {t.buttons.generate}
        </Button>
      </S.Wrapper>
    </>
  );
}
