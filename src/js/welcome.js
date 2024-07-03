document.addEventListener("DOMContentLoaded", () => {

    // WELCOME NOTIFICATION (PUSHED TO DESKTOP)
    if (localStorage && localStorage.getItem("welcome-notification") === null) {

        sendNotification(
            "Welcome to MeOS!",
            "This is a simple operating system built with HTML, CSS, and JavaScript.",
            undefined,
            "MeOS",
            "/favicon.ico",
            true
        ); 

        localStorage.setItem("welcome-notification", true);
    }
});