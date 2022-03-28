import { ComponentType } from 'react';
import { FiInfo, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import { ToastMessageType } from 'shared/toasts';

type ToastMessagesIcons = {
  [key in ToastMessageType]: {
    icon: ComponentType;
  };
};

export const icons: ToastMessagesIcons = {
  info: {
    icon: FiInfo,
  },
  error: {
    icon: FiAlertCircle,
  },
  success: {
    icon: FiCheckCircle,
  },
};

export const REMOVE_TOAST_TIMEOUT = 3000;
