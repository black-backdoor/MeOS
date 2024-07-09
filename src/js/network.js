function printNetworkInfo() {
    // Function to calculate console.log color based on value and thresholds
    function calculateColor(value, middle, max) {
        if (value < middle) {
            return 'green';
        } else if (value >= middle && value < max) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    // Function to calculate console.log color based on another condition
    function calculateColor1(value, middle, max) {
        if (value > middle) {
            return 'green';
        } else if (value <= middle && value > max) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    if ('connection' in navigator) {
        const connection = navigator.connection;
        console.info(`%c[NETWORK]%c Downlink: %c${connection.downlink}%c Mbps`, 'color: gold', 'color: inherit', `color: ${calculateColor1(connection.downlink, 0.3, 0.6)}`, 'color: inherit;');
        console.info(`%c[NETWORK]%c Save data mode: %c${connection.saveData}`, 'color: gold', 'color: inherit', 'color: inherit;');
        console.info(`%c[NETWORK]%c RTT: %c${connection.rtt}%c ms`, 'color: gold', 'color: inherit', `color: ${calculateColor(connection.rtt, 300, 800)}`, 'color: inherit;');
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