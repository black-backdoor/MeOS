import sendNotification from "../modules/notification.js";

if (localStorage && localStorage.getItem("welcome") === null) {
    localStorage.setItem("welcome", true);

    sendNotification(
        "Welcome to MeOS!",
        "This is a simple operating system built with HTML, CSS, and JavaScript.",
        undefined,
        "MeOS",
        "/favicon.ico",
        true
    );


    /* PLAYGROUND NOTIFICATIONS */    
    setTimeout(() => {
        sendNotification(
            "example@admin.com received 2 new emails",
            "Maintanance Report, Maintenance Invoice",
            undefined,
            "Mail",
            undefined,
            true
        );
    }, 2000);

    setTimeout(() => {
        sendNotification(
            "New Version Available",
            "New version of MeOS is available.",
            undefined,
            "MeOS",
            "/favicon.ico",
            true
        );
    }, 5000);

    setTimeout(() => {
        sendNotification(
            "New Version Available",
            "New version of Files is available.",
            undefined,
            "Files",
            "/assets/apps/files.svg",
            true
        );
    }, 6000);

    setTimeout(() => {
        sendNotification(
            "Backup Completed",
            "Your files have successfully been backed up to Google Drive.",
            "/assets/apps/files-backup.svg",
            "Files",
            "/assets/apps/files.svg",
            true
        );
    }, 15000);
}    


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