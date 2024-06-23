/*
 * 404 Page Script
 * Redirect to home page on any key press
 * Redirect to home page on any click if the input device is a touch screen
 */

document.addEventListener("DOMContentLoaded", function() {
    // Redirect to home page on any key press
    document.addEventListener("keydown", function(event) {
        window.location.href = "/";
    });

    // Check if the input device is a touch screen
    if (window.matchMedia("(pointer: coarse)").matches) {
        // change the link text
        const link = document.querySelector("a");
        link.innerText = "Click to continue...";

        // redirect to home page on any click
        document.addEventListener("click", function() {
            window.location.href = "/";
        });
    }
});
