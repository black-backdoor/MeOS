function checkLoadEventEnd() {
    if (performance.timing.loadEventEnd !== 0) {
        calculatePageLoadTime();
    } else {
        setTimeout(checkLoadEventEnd, 100);
    }
}

function calculatePageLoadTime() {
    // calculate console.log color based on value and thresholds
    function calculateColor(value, middle, max) {
        if (value < middle) {
            return `green`;
        } else if (value >= middle && value < max) {
            return `orange`;
        } else {
            return `red`;
        }
    }

    const page_load_time = performance.timing.loadEventEnd - performance.timing.fetchStart;
    const dcl = performance.timing.domComplete - performance.timing.domInteractive;

    console.info(`%c[PERFORMANCE]%c Page load time is %c${page_load_time}%c ms`, "color: orange", "color: inherit", `color: ${calculateColor(page_load_time, 1000, 3000)};`, "color: inherit;");
    console.info(`%c[PERFORMANCE]%c DOM Content Loaded (DCL): %c${dcl}%c ms`, "color: orange", "color: inherit", `color: ${calculateColor(dcl, 800, 1200)};`, "color: inherit;");
}

window.addEventListener("load", checkLoadEventEnd, false);