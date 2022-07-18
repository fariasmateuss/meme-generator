export const light = {
  background: '#eeeeee',
  modal: '#ffffff',
  alto: '#737380',
  heading: '#2e384d',
  input: {
    color: '#000000',
    borderColor: '#dbdbdb',
    background: '#f5f6fA',
  },
  text: '#ffffff',
  orange: '#ff9000',
  danger: '#c53030',
  disabled: '#666360',
  loading: '#2e384d',
  toggleMode: '#F9B52A',
  button: {
    background: '#4395D8',
    color: '#ffffff',
  },
};

export const dark: typeof light = {
  ...light,
  background: '#171717',
  modal: '#444444',
  alto: '#dbdbdb',
  heading: '#ffffff',
  toggleMode: '#C5CFDC',
  input: {
    color: '#ffffff',
    borderColor: '#5a5a5a',
    background: '#404040',
  },
  loading: '#ffffff',
};
