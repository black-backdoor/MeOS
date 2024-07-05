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
} else {
    const batteryStatus = document.querySelector('#taskbar > .menu > .battery');
    console.info('%c[setBatteryStatus]%c battery status is not supported', 'color: lightgreen', 'color: inherit');
    batteryStatus.title = 'Battery API is not supported';
}



function updateBatteryStatus() {
    function convertSecondsToTime(seconds) {
        if (seconds == Infinity) return '∞';

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
    
        return `${hours}h ${minutes}m`;
    }

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
            const percent = Math.round(level * 100);
            
            /* TWO EXAMPLES OF BATTERY STATUS MESSAGES
            let message = `Battery status: ${percent}% `;

            if (charging) {
                if (battery.chargingTime === Infinity) {
                    // Example: Battery status: 50% (plugged in)
                    message += 'available (plugged in)';
                } else {
                    // Example: Battery status: 50% (2h 30m until full)
                    message += `(${convertSecondsToTime(battery.chargingTime)} until full)`;
                }
            } else {
                if (battery.dischargingTime === Infinity) {
                    // Example: Battery status: 50% remaining
                    message += 'remaining';
                } else {
                    // Example: Battery status: 50% (2h 30m left)
                    message += `(${convertSecondsToTime(battery.dischargingTime)} left)`;
                }
            }
            */
            
            let message;

            if (charging) {
                message = `Charging: ${percent}% `;
                if (battery.chargingTime === Infinity) {
                    // Example: 50% (plugged in)
                    message += 'available (plugged in)';
                } else {
                    // Example: 50% (2h 30m until full)
                    message += `(${convertSecondsToTime(battery.chargingTime)} until full)`;
                }
            } else {
                message = `Discharging: ${percent}% `;
                if (battery.dischargingTime === Infinity) {
                    // Example: Discharging: 50% remaining
                    message += 'remaining';
                } else {
                    // Example: Discharging: 50% (2h 30m left)
                    message += `(${convertSecondsToTime(battery.dischargingTime)} left)`;
                }
            }

            batteryStatus.title = message;

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
        });
    } else {
        console.debug('[setBatteryStatus] battery status updated: not supported');
        batteryStatus.title = 'Battery status is not supported';
    }
}
