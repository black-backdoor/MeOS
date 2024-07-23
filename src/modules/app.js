
/* TASKBAR */

function listenTaskbarOpen(name, callback) {
    console.debug('[app.js] adding listener for', name);

    document.addEventListener('taskbar:open', function(e) {
        if (e.detail.name === name) {
            callback();
        }
    });
}

function sendTaskbarOpen(name) {
    const event = new CustomEvent('taskbar:open', { detail: { name } });
    document.dispatchEvent(event);
}




export default function() {};

export { listenTaskbarOpen, sendTaskbarOpen };