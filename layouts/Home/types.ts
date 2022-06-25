import { Template } from 'shared/apiSchema';

export type HomeProps = {
  templates: Template[];
};

export type Box = Template['box_count'];

export type DownloadFile = Pick<Template, 'url' | 'name'>;
