/*
    This script is used to display the battery status in the taskbar.
    Since the battery status is not supported in all browsers, we need to check if it is supported before using it.
    The battery status is updated every time the battery status changes.

    This script is included with the 'defer' attribute in the script tag,
    because the updateBatteryStatus function isn't (supposed to be) called by other scripts.
*/



if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
        console.info('%c[setBatteryStatus]%c battery status is supported', 'color: lightgreen', 'color: inherit');
        updateBatteryStatus();
        battery.addEventListener('chargingchange', updateBatteryStatus);
        battery.addEventListener('chargingtimechange', updateBatteryStatus);
        battery.addEventListener('dischargingtimechange', updateBatteryStatus);
        battery.addEventListener('levelchange', updateBatteryStatus);
    });
}

function updateBatteryStatus() {
    const batteryStatus = document.querySelector('#taskbar > .menu > .battery');
    const batteryIMG = document.querySelector('#taskbar > .menu > .battery img');

    if (batteryStatus == undefined || batteryIMG == undefined) {
        console.warn('%c[setBatteryStatus]%c the battery icon was not found', 'color: lightgreen', 'color: inherit');

        // if the battery icon is not found, try again in 1 second
        setTimeout(updateBatteryStatus, 1000);

        return;
    }

    if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
            const { level, charging } = battery;
            const status = charging ? 'charging' : 'not charging';
            // const percent = Math.round(level * 100);
            const percent = 50;
            const message = `The battery is ${status} and the current level is ${percent}%`;
            batteryStatus.title = message;

            console.debug(`%c[setBatteryStatus]%c battery status updated to: '${message}'`, 'color: lightgreen', 'color: inherit');
            console.debug(
                `%c[setBatteryStatus]%c battery level: %c${percent}% %cand battery is %c${status}`,
                'color: lightgreen',
                'color: inherit',
                `color: ${percent <= 20 ? 'red' : percent <= 50 ? 'orange' : 'green'}`,
                'color: inherit',
                `color: ${charging ? 'green' : 'red'}`
            );
        });
    } else {
        console.debug('[setBatteryStatus] battery status updated: not supported');
        batteryStatus.title = 'Battery status is not supported';
    }
}
