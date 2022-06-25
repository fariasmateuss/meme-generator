import { ChangeEvent, FormEvent } from 'react';

import { Template } from 'shared/apiSchema';

export type FormProps = {
  template: Template;
  loading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
};
