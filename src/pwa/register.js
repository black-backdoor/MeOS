/*
    This file is used to register the service worker.
*/

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.debug("%c[PWA] %cService worker registered", "color: DodgerBlue", "color: inherit", res))
            .catch(err => console.debug("%c[PWA] %cService worker not registered", "color: DodgerBlue", "color: inherit", err));

    });
} else {
    console.info("%c[PWA] %cService Worker is not supported in this browser", "color: DodgerBlue", "color: inherit");
}

