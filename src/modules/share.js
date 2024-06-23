/**
 * Share a link to the WebOS module.
 * @param {Function} onClipboard - Function to run when the link is copied to the clipboard.
 * @param {Function} onSuccess - Function to run when the share process is successful.
 * @param {Function} onError - Function to run when the share process fails.
 * @returns {Promise<void>} - A promise that resolves when the sharing process is complete.
 */

async function share(onClipboard = () => {}, onSuccess = () => {}, onError = () => {}) {
    /* check if Web Share API is supported */
    if (navigator.canShare) {
        console.debug('[Share] Web Share API is supported');

        const shareData = {
            title: "WebOS",
            text: "A web-based operating system that looks and feels like a real desktop environment.",
            url: "https://webos.lima.zone",
        };

        try {
            await navigator.share(shareData);
            console.debug('[Share] Successfully shared via Web Share API');
            onSuccess();
        } catch (error) {
            console.error('[Share] Error sharing via Web Share API:', error);
            onError();
        }
    }

    else  {
        /* if doesn't browser supports Web Share API switch to Clipboard API */
        console.debug('[Share] Web Share API is not supported, Switching to Clipboard API');

        try {
            onClipboard();

            /* copy to clipboard */
            await navigator.clipboard.writeText("https://webos.lima.zone");

            console.debug('[Share] Copied to clipboard');
            onSuccess();
        } catch (error) {
            console.debug('[Share] Clipboard API failed:', error);
            onError();
        }
    }
}