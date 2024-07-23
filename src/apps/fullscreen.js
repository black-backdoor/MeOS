import { listenTaskbarOpen } from '/modules/app.js';


const fullscreenTaskbarApps = document.querySelectorAll('taskbar-app[name="fullscreen"]');
const minimize = '/assets/compress-arrows.svg';
const maximize = '/assets/expand-arrows.svg';

if (document.fullscreenEnabled) {
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenTaskbarApps.forEach(app => {
                app.icon = minimize;
            });
        } else {
            fullscreenTaskbarApps.forEach(app => {
                app.icon = maximize;
            });
        }
    });
}


listenTaskbarOpen('fullscreen', () => {
    // check if the browser supports fullscreen mode
    if (document.fullscreenEnabled) {
        // if the browser supports fullscreen mode, toggle it
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    } else {
        // if the browser does not support fullscreen mode, alert the user
        alert('Fullscreen mode is not supported in this browser.');
    }
});