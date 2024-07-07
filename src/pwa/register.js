/*
    This file is used to register the service worker.
*/

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("%c[PWA] %cService worker registered", 'color: DodgerBlue', 'color: inherit', res))
            .catch(err => console.warn("%c[PWA] %cERROR%c: Service worker not registered", 'color: DodgerBlue', 'color: red;', 'color: inherit', err));

    });
} else {
    console.log("%c[PWA] %cService Worker is not supported in this browser", 'color: DodgerBlue', 'color: inherit');
}

