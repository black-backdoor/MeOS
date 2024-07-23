console.log(
`
 _____     _____ _____ 
|     |___|     |   __|
| | | | -_|  |  |__   |
|_|_|_|___|_____|_____| 

Version: 3.18.3 
Made by @black-backdoor

`
);


document.addEventListener("DOMContentLoaded", () => {

    // WELCOME NOTIFICATION (PUSHED TO DESKTOP)
    if (sessionStorage && sessionStorage.getItem("welcome-notification") === null) {
        
        sendNotification(
            "Welcome to MeOS!",
            "This is a simple operating system built with HTML, CSS, and JavaScript.",
            undefined,
            "MeOS",
            "/favicon.ico",
            true
        ); 

        sessionStorage.setItem("welcome-notification", true);
    }
});



document.addEventListener("DOMContentLoaded", () => {
    if (localStorage && localStorage.getItem("fullscreenPopup") === null) {
        const html = `
        <desktop-popup_yes_no
            id="fullscreenPopup"
            position
            icon="/assets/expand-arrows.svg"
            message_title="Fullscreen"
            message="MeOS best works in fullscreen mode. Do you want to enable fullscreen mode?"
        ></desktop-popup_yes_no>
        `;

        document.body.insertAdjacentHTML("beforeend", html);
        document.querySelector("#fullscreenPopup").addEventListener("close", (event) => {
            if (event.detail === "ok") {
                document.documentElement.requestFullscreen();
            }

            localStorage.setItem("fullscreenPopup", true);
        });
    }
});