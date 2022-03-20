type Strings = {
  heading: {
    meme_generator: string;
    meme_generator_description: string;
    pick_a_meme: string;
    customize_your_own: string;
  };
  fields: {
    placeholder: string;
  };
  buttons: {
    generate: string;
    download: string;
    recreate: string;
  };
  yup: {
    mixed_required_field: string;
  };
};

export type I18nStateContextData = {
  t: Strings;
};
