/*
 * Redirects to the home page after a certain amount of time.
 * The time is set by the updateDuration variable.
 * If sessionStorage is available, the updateDuration is read from there.
 */
document.addEventListener("DOMContentLoaded", async () => {
    let updateDuration = 8000;  // 8 seconds

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