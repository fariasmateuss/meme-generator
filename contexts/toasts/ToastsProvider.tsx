import React, {
  useMemo,
  useCallback,
  useState,
  PropsWithChildren,
} from 'react';
import { useTransition } from 'react-spring';
import { v4 as uuid } from 'uuid';

import { ToastMessageData } from 'shared/toasts';
import { ToastContainer } from 'styles/components/ToastContainer';
import { ToastMessage } from 'components/ToastMessage';
import { ToastsStateProvider, ToastsDispatchProvider } from './ToastsContext';
import { AddToastMessage } from './types';

export function ToastsProvider({ children }: PropsWithChildren<unknown>) {
  const [messages, setMessages] = useState<ToastMessageData[]>([]);
  const messagesWithTransition = useTransition(
    messages,
    message => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
      },
      enter: {
        right: '0%',
        opacity: 1,
      },
      leave: {
        right: '-120%',
        opacity: 0,
      },
    },
  );

  const addToast = useCallback((message: AddToastMessage) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        ...message,
        id: uuid(),
      },
    ]);
  }, []);

  const removeToast = useCallback(id => {
    setMessages(prevMessages =>
      prevMessages.filter(message => message.id !== id),
    );
  }, []);

  const toastsState = useMemo(
    () => ({
      messages,
    }),
    [messages],
  );

  const toastsDispatch = useMemo(
    () => ({
      addToast,
      removeToast,
    }),
    [addToast, removeToast],
  );

  return (
    <ToastsStateProvider value={toastsState}>
      <ToastsDispatchProvider value={toastsDispatch}>
        <ToastContainer>
          {messagesWithTransition.map(({ key, item, props }) => (
            <ToastMessage key={key} style={props} message={item} />
          ))}
        </ToastContainer>
        {children}
      </ToastsDispatchProvider>
    </ToastsStateProvider>
  );
}
