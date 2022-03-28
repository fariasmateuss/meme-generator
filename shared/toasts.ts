export type ToastMessageType = 'info' | 'success' | 'error';

export type ToastMessageData = {
  id: string;
  title: string;
  description?: string;
  type: ToastMessageType;
};
