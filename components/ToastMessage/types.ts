import { CSSProperties } from 'react';

import { ToastMessageData } from 'shared/toasts';

export type ToastMessageProps = {
  message: ToastMessageData;
  style?: CSSProperties;
};
