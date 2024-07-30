if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration => {
            console.log("%c[PWA] %cService worker registered", 'color: DodgerBlue', 'color: inherit', registration);

            // Listen for updates to the Service Worker
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {

                            // New update found
                            console.log("%c[PWA] %cNew Service Worker available", 'color: DodgerBlue', 'color: inherit');

                            // Dispatch a custom event to notify the app
                            const event = new CustomEvent('serviceWorkerUpdate', { });                   
                            document.dispatchEvent(event);
                        } else {
                            // First Service Worker installed
                            console.log('%c[PWA] %cService Worker installed for the first time', 'color: DodgerBlue', 'color: inherit');
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.warn("%c[PWA] %cERROR%c: Service worker not registered", 'color: DodgerBlue', 'color: red;', 'color: inherit', err)
        });
}
