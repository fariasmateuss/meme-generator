import {
  useCallback,
  useMemo,
  useEffect,
  ComponentType,
  CSSProperties,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiX } from 'react-icons/fi';

import { ToastMessageData } from 'shared/toasts';
import { useToastsDispatch } from 'contexts/toasts/ToastsContext';
import { icons, REMOVE_TOAST_TIMEOUT } from 'constants/toastMessage';

import * as S from 'styles/components/ToastMessage';

type ToastMessageProps = {
  message: ToastMessageData;
  style?: CSSProperties;
};

export function ToastMessage({ message, style }: ToastMessageProps) {
  const { removeToast } = useToastsDispatch();

  useEffect(() => {
    const timeToDelete = setTimeout(() => {
      removeToast(message.id);
    }, REMOVE_TOAST_TIMEOUT);

    return () => clearTimeout(timeToDelete);
  }, [message.id, removeToast]);

  const handleRemoveToastMessage = useCallback(() => {
    removeToast(message.id);
  }, [message.id, removeToast]);

  const Icon: ComponentType<IconBaseProps> = useMemo(
    () => icons[message.type || 'info']?.icon,
    [message.type],
  );

  return (
    <S.Container
      style={style}
      description={message.description}
      type={message.type}
    >
      <Icon />

      <S.Notify>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </S.Notify>

      <S.Close type="button" onClick={handleRemoveToastMessage}>
        <FiX />
      </S.Close>
    </S.Container>
  );
}
