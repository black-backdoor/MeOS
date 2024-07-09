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

function logPerformance() {
    /*
    if ('performance' in window) {
        logPageTimings();
    } else {
        console.info("Page Timing API is not present");
    }
    */

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