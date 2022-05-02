import { useCallback } from 'react';
import { useCopyToClipboard } from 'react-use';
import noop from 'lodash.noop';

import { useI18nState } from 'contexts/i18n/I18Context';
import { useToastsDispatch } from 'contexts/toasts/ToastsContext';

/**
 * Exposes the Open Graph Share functionality. If the share is not supported, it will simply
 * copy to the clipboard and display a toast message.
 */
export function useShare() {
  const [, copyToClipboard] = useCopyToClipboard();
  const { addToast } = useToastsDispatch();
  const { t } = useI18nState();

  const share = useCallback(
    ({ title, text, url }: ShareData) => {
      if (navigator?.share) {
        navigator
          .share({
            title,
            text,
            url,
          })
          .catch(noop);

        return;
      }

      if (!url) {
        return;
      }

      copyToClipboard(url);

      addToast({
        title: t.actions.errors.something_is_all_gummed_up,
        description: t.actions.info.share_API,
        type: 'info',
      });
    },
    [copyToClipboard, addToast, t],
  );

  return share;
}
