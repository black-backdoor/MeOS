document.addEventListener('DOMContentLoaded', function () {
    const batteryStatus = document.querySelector('#taskbar > .menu > .battery');
    const batteryIMG = document.querySelector('#taskbar > .menu > .battery img');


    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
            const { level, charging } = battery;
            const status = charging ? 'charging' : 'not charging';
            const percent = `${Math.round(level * 100)}%`;
            const message = `The battery is ${status} and the current level is ${percent}`;
            batteryStatus.title = message;
        });
    } else {
        batteryStatus.title = 'Battery status is not supported';
    }
});
