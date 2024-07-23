
/* TASKBAR */

function listenTaskbarOpen(name, callback) {
    console.info(`%c[app.js]%c adding taskbar:open event listener for %c${name}`, 'color: red', 'color: inherit', 'color: DodgerBlue');

    document.addEventListener('taskbar:open', function(e) {
        if (e.detail.name === name) {
            callback();
        }
    });
}

function sendTaskbarOpen(name) {
    const event = new CustomEvent('taskbar:open', { detail: { name } });
    document.dispatchEvent(event);
    console.debug(`%c[app.js]%c sending taskbar:open event for %c${name}`, 'color: red', 'color: inherit', 'color: DodgerBlue');
}






// Apps
export { listenTaskbarOpen };


// Components
export { sendTaskbarOpen };