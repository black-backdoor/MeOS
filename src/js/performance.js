function logResourceTimings(resourceType) {
    console.groupCollapsed(`%c[PERFORMANCE]%c Network Resources: ${resourceType}`, 'color: gold', 'color: inherit;');

    var resourceList = window.performance.getEntriesByType("resource");
    for (i = 0; i < resourceList.length; i++) {
        if (resourceList[i].initiatorType == resourceType) {
            console.debug(`Name: ${resourceList[i].name}, Duration: ${resourceList[i].duration.toFixed(1)} ms`);
        }
    }

    console.groupEnd();
}

function logPageTimings() {
    function calculateColor(value, middle, max) {
        if (value < middle) {
            return 'green';
        } else if (value >= middle && value < max) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    console.group("%c[PERFORMANCE]%c Page", 'color: orange', 'color: inherit');
    const page_load_time = performance.timing.loadEventEnd - performance.timing.fetchStart;
    const page_navigation_time = performance.timing.loadEventEnd - performance.timing.navigationStart;
    const dcl = performance.timing.domComplete - performance.timing.domInteractive;
    console.info(`%c[PERFORMANCE]%c Page load time is %c${page_load_time}%c ms`, 'color: orange', 'color: inherit', `color: ${calculateColor(page_load_time, 1000, 3000)};`, 'color: inherit;');
    console.info(`%c[PERFORMANCE]%c DOM Content Loaded (DCL): %c${dcl}%c ms`, 'color: orange', 'color: inherit', `color: ${calculateColor(dcl, 800, 1200)};`, 'color: inherit;');
    console.info(`%c[PERFORMANCE]%c Page navigation time is ${page_navigation_time} ms`, 'color: orange', 'color: inherit');    
    console.groupEnd();

    const paintObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {    
            // The time to first-paint took 509 milliseconds.
            // The time to first-contentful-paint took 509 milliseconds.
            console.log(`%c[PERFORMANCE]%c The time to ${entry.name} took ${Math.round(entry.startTime)} milliseconds.`, 'color: orange', 'color: inherit');
        });
    });
    
    paintObserver.observe({ type: "paint", buffered: true });
}

function logPerformance() {
    if ('performance' in window) {
        logPageTimings();
    } else {
        console.info("Page Timing API is not present");
    }

    if (window.performance && window.performance.getEntriesByName) {
        logResourceTimings("img");
        logResourceTimings("link");
        logResourceTimings("script");
        logResourceTimings("iframe");
    } else {
        console.info("Resource Timing API is not present");
    }
}

// all images have finished loading once onload is called
// but set a timeout, so that the load event finishes, and all page timers complete (some end after onload finishes)
window.onload = setTimeout(logPerformance, 500);