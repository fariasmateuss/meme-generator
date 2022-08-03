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
