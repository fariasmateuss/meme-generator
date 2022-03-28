import { ToastMessageData } from 'shared/toasts';

export type ToastsStateContextData = {
  messages: ToastMessageData[];
};

export type ToastsDispatchContextData = {
  addToast: (message: Omit<ToastMessageData, 'id'>) => void;
  removeToast: (id: string) => void;
};

export type AddToastMessage = Omit<ToastMessageData, 'id'>;
