/**
 * Share a link to the WebOS module.
 * @param {Function} onClipboard - Function to run when the link is copied to the clipboard.
 * @param {Function} onSuccess - Function to run when the share process is successful.
 * @param {Function} onError - Function to run when the share process fails.
 * @returns {Promise<void>} - A promise that resolves when the sharing process is complete.
 */

async function shareURL(onClipboard = () => {}, onSuccess = () => {}, onError = () => {}, description = "") {
    if (navigator.canShare) {
        console.debug('[Share] Web Share API is supported');

        try {
            const shareData = {
                title: window.document.title,
                text: description,
                url: window.location.href
            };

            await navigator.share(shareData);
            console.debug('[Share] Successfully shared via Web Share API');
            onSuccess();
        } catch (error) {
            console.error('[Share] Error sharing via Web Share API:', error);
            onError();
        }
    }

    else {
        /* if doesn't browser supports Web Share API switch to Clipboard API */
        console.debug('[Share] Web Share API is not supported, Switching to Clipboard API');

        try {
            await navigator.clipboard.writeText(window.location.href);
            console.debug('[Share] Copied to clipboard');
            onClipboard();
        } catch (error) {
            console.debug('[Share] Clipboard API failed:', error);
            onError();
        }
    }
}
