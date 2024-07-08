document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('#share');
    const shareButtonIMG = document.querySelector('#share img');

    const description = document.head.querySelector('meta[name="description"]').content ?? "Check out MeOS!";

    shareButton.onclick = async function() {
        shareButton.disabled = true;
        
        const clipboard = function() {
            /* change button icon for user feedback */
            let oldSRC = shareButtonIMG.src;
            let newSRC = shareButtonIMG.getAttribute('copied');

            shareButtonIMG.src = newSRC;

            /* change button icon back */
            setTimeout(() => { shareButtonIMG.src = oldSRC; shareButton.disabled = false; }, 500);
        };

        const error = function() {
            shareButton.style.backgroundColor = 'red';
        };

        await shareURL(clipboard, undefined, error, description);        
    };
});