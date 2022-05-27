export type Template = {
  id: string;
  name: string;
  url: string;
  width: string;
  height: string;
  box_count: {
    [key: number]: string;
  };
};

export type Meme = {
  url: string;
  page_url: string;
};

export type ErrorResponse = {
  error_message: string;
};
