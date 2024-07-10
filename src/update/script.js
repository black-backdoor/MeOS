/*
    Redirects to the home page after a certain amount of time.
    The duration of the update is set by the 'updateDuration' variable. DEFAULT: 5000ms
*/

document.addEventListener("DOMContentLoaded", async () => {
    let updateDuration = 5000;

    // if sessionStorage is available, use the stored value for updateDuration
    if ('sessionStorage' in window) {
        const storedUpdateDuration = sessionStorage.getItem('updateDuration');
        if (storedUpdateDuration) {
            console.debug(`Stored update duration: ${storedUpdateDuration}`);
            updateDuration = parseInt(storedUpdateDuration);
            sessionStorage.removeItem('updateDuration');
        }
    }

    setTimeout(() => {
        window.location.href = '/';
    }, updateDuration);
});