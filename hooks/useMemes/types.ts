import { Template } from 'shared/apiSchema';

export type GetMemes = {
  data: {
    memes: Template[];
  };
};
