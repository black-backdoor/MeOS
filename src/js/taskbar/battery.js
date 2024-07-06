/*
    This script displays the battery status in the taskbar.
    Since the battery status is not supported in all browsers, we need to check if it is supported before using it.
    The battery status is updated every time the battery status changes.

    This script is included with the 'defer' attribute in the script tag,
    because the updateBatteryStatus function isn't (supposed to be) called by other scripts.
*/

if ('getBattery' in navigator) {
    navigator.getBattery().then((battery) => {
        console.info('%c[setBatteryStatus]%c battery status is supported', 'color: lightgreen', 'color: inherit');
        updateBatteryStatus(battery);
        battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
        battery.addEventListener('chargingtimechange', () => updateBatteryStatus(battery));
        battery.addEventListener('dischargingtimechange', () => updateBatteryStatus(battery));
        battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
    });
} else {
    console.info('%c[setBatteryStatus]%c battery status is not supported', 'color: lightgreen', 'color: inherit');

    const batteryStatus = document.querySelector('#taskbar > .menu > .battery');
    batteryStatus.title = 'Battery API is not supported';

    const batteryIconStyle = document.querySelector('#taskbar > .menu > .battery > svg style');
    batteryIconStyle.innerHTML = `
        .fill-1, .fill-2, .fill-3, .fill-4, .fill-5, .fill-6, .fill-7, .fill-8, .fill-9, .fill-10 { display: none; }
    `;

    const batteryIconText = document.querySelector('#taskbar > .menu > .battery > svg .text');
    batteryIconText.innerHTML = '⨉';
}

function updateBatteryStatus(battery) {
    const text_percent = false;

    function convertSecondsToTime(seconds) {
        if (seconds === Infinity) return '∞';

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }


    const { level, charging } = battery;
    const percent = Math.round(level * 100);
    let message = `Battery status: ${percent}% `;

    if (charging) {
        if (battery.chargingTime === Infinity) {
            message += 'available (plugged in)';
        } else {
            message += `(${convertSecondsToTime(battery.chargingTime)} until full)`;
        }
    } else {
        if (battery.dischargingTime === Infinity) {
            message += 'remaining';
        } else {
            message += `(${convertSecondsToTime(battery.dischargingTime)} left)`;
        }
    }

    const batteryStatus = document.querySelector('#taskbar > .menu > .battery');
    batteryStatus.title = message;
        
    const batteryIconText = document.querySelector('#taskbar > .menu > .battery > svg .text');
    const batteryIconStyle = document.querySelector('#taskbar > .menu > .battery > svg style');

    if(text_percent) {
        batteryIconText.innerHTML = percent;
        batteryIconStyle.innerHTML = `[class^="fill-"] { display: none; } `;
    } else {
        batteryIconText.innerHTML = '';
        batteryIconStyle.innerHTML = '';

        const fillLevel = Math.round(level * 10);
        for (let i = 1; i <= 10; i++) {
            if (i > fillLevel) {
                batteryIconStyle.innerHTML += `.fill-${i} { display: none; }`;
            }
        }
    }


    // Debug logs
    console.debug(`%c[setBatteryStatus]%c battery title updated to: '${message}'`, 'color: lightgreen', 'color: inherit');
    console.info(
        `%c[setBatteryStatus]%c battery level: %c${percent}% %cand battery is %c${charging ? 'charging' : 'discharging'}`,
        'color: lightgreen',
        'color: inherit',
        `color: ${percent <= 20 ? 'red' : percent <= 50 ? 'orange' : 'green'}`,
        'color: inherit',
        `color: ${charging ? 'green' : 'red'}`,
    );

    console.debug("IsCharging", charging);
    console.debug("Percentage", percent);
    console.debug("chargingTime", battery.chargingTime);
    console.debug("dischargingTime", battery.dischargingTime);
}
