import { useCallback } from 'react';
import { useCopyToClipboard } from 'react-use';
import noop from 'lodash.noop';

/**
 * Exposes the Open Graph Share functionality. If the share is not supported, it will simply
 * copy to the clipboard.
 */
export function useShare() {
  const [, copyToClipboard] = useCopyToClipboard();

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
    },
    [copyToClipboard],
  );

  return share;
}
