document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('#share');
    const shareButtonIMG = document.querySelector('#share img');

    shareButton.onclick = async function() {
        /* disable button to prevent multiple clicks */
        shareButton.disabled = true;

        /* console.debug('[Share] Share button clicked'); */
        
        const clipboard = function() {
            /* change button icon for user feedback */
            let oldSRC = shareButtonIMG.src;
            let newSRC = shareButtonIMG.getAttribute('copied');

            shareButtonIMG.src = newSRC;

            /* change button icon back */
            setTimeout(() => { shareButtonIMG.src = oldSRC; }, 500);
        };

        const error = function() {
            shareButton.style.backgroundColor = 'red';
        };

        await share(clipboard, undefined, error, description = "Check out MeOS!");


        /* re-enable button */
        shareButton.disabled = false;
    };
});