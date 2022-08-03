import { Template } from 'shared/apiSchema';

export type CarouselProps = {
  templates: Template[];
  onSeletedTemplate: (template: Template) => void;
};
