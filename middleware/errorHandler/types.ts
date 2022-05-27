import { AxiosError } from 'axios';

type ErrorBase<T> = {
  error: Error | AxiosError<T>;
  type: 'axios-error' | 'stock-error';
};

export type IAxiosError<T> = ErrorBase<T> & {
  error: AxiosError<T>;
  type: 'axios-error';
};

export type StockError<T> = ErrorBase<T> & {
  error: Error;
  type: 'stock-error';
};
