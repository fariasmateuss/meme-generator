import axios, { AxiosError } from 'axios';

import { IAxiosError, StockError } from './types';

export function axiosErrorHandler<T>(
  callback: (err: IAxiosError<T> | StockError<T>) => void,
) {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      callback({
        error,
        type: 'axios-error',
      });
    } else {
      callback({
        error,
        type: 'stock-error',
      });
    }
  };
}
