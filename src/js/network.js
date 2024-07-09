function printNetworkInfo() {
    // Function to calculate console.log color based on value and thresholds
    function calculateColor(value, middle, max, lowerIsBetter = false) {
        if (!lowerIsBetter) {
            if (value < middle) {
                return 'green';
            } else if (value >= middle && value < max) {
                return 'orange';
            } else {
                return 'red';
            }
        }

        else {
            if (value > middle) {
                return 'green';
            } else if (value <= middle && value > max) {
                return 'orange';
            } else {
                return 'red';
            }
        }
    }

    if ('connection' in navigator) {
        const connection = navigator.connection;
        console.group('%c[NETWORK]%c Network Information', 'color: gold', 'color: inherit;');
        console.info(`Downlink: %c${connection.downlink}%c Mbps`, `color: ${calculateColor(connection.downlink, 0.3, 0.6, true)}`, 'color: inherit;');
        console.info(`Save data mode: %c${connection.saveData}`, `color: ${connection.saveData ? 'red' : 'green'}`);
        console.info(`RTT: %c${connection.rtt}%c ms`, `color: ${calculateColor(connection.rtt, 300, 800)}`, 'color: inherit;');
        console.groupEnd();
    } else {
        console.log(`%c[NETWORK]%c Network Information API not supported`, 'color: gold', 'color: inherit');
    }
}

document.addEventListener('DOMContentLoaded', function() {    
    if ('requestIdleCallback' in window) {
        console.debug('%c[NETWORK]%c Using requestIdleCallback', 'color: gold;', 'color: inherit;');
        requestIdleCallback(printNetworkInfo);
    } else {
        console.debug('%c[NETWORK]%c Using setTimeout', 'color: gold;', 'color: inherit;');
        setTimeout(printNetworkInfo, 5000);
    }
});