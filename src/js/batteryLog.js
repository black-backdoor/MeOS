/*
    Log battery status
*/

if ('getBattery' in navigator) {
    console.info('%c[Battery]%c battery status is supported', 'color: green', 'color: inherit');

    navigator.getBattery().then((battery) => {
        function logBatteryStatus(battery) {
            const { level, charging } = battery;
            const percent = Math.floor(level * 100);

            console.info(
                `%c[Battery]%c battery level: %c${percent}% %cand battery is %c${charging ? 'charging' : 'discharging'}`,
                'color: green',
                'color: inherit',
                `color: ${percent <= 20 ? 'red' : percent <= 50 ? 'orange' : 'green'}`,
                'color: inherit',
                `color: ${charging ? 'green' : 'red'}`,
            );
    
            console.groupCollapsed(`%c[Battery]%c Info`, 'color: green', 'color: inherit');
            console.debug("IsCharging", charging);
            console.debug("Percentage", percent);
            console.debug("chargingTime", battery.chargingTime);
            console.debug("dischargingTime", battery.dischargingTime);
            console.groupEnd();
        }

        logBatteryStatus(battery);
        battery.addEventListener('chargingchange', () => logBatteryStatus(battery));
        battery.addEventListener('chargingtimechange', () => logBatteryStatus(battery));
        battery.addEventListener('dischargingtimechange', () => logBatteryStatus(battery));
        battery.addEventListener('levelchange', () => logBatteryStatus(battery));
    });

} else {
    console.info('%c[Battery]%c battery status is not supported', 'color: green', 'color: inherit');
}