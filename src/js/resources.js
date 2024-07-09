function logResourceTimings(resourceType) {
    console.group(resourceType);

    var resourceList = window.performance.getEntriesByType("resource");
    for (i = 0; i < resourceList.length; i++) {
        if (resourceList[i].initiatorType == resourceType) {
            console.debug(`Name: ${resourceList[i].name}, Duration: ${resourceList[i].duration.toFixed(1)} ms`);
        }
    }

    console.groupEnd();
}

function logPageTimings() {
    let timing = window.performance.timing;
    console.group("Page");
    console.debug("DNS Time: " + (timing.domainLookupEnd - timing.domainLookupStart));
    console.debug("Connection Time: " + (timing.connectEnd - timing.connectStart));
    console.debug("Request Time: " + (timing.responseEnd - timing.requestStart));
    console.debug("Fetch Time: " + (timing.responseEnd - timing.fetchStart));
    console.debug("Render Time: " + (timing.domComplete - timing.domLoading));
    console.debug("User Time: " + (timing.loadEventEnd - timing.navigationStart));
    console.groupEnd();
}

function logPerformance() {
    if (window.performance && window.performance.timing) {
        logPageTimings();
    } else {
        console.info("Page Timing API is not present");
    }

    if (window.performance && window.performance.getEntriesByName) {
        logResourceTimings("img");
        logResourceTimings("link");
        logResourceTimings("script");
    } else {
        console.info("Resource Timing API is not present");
    }
}

//all images have finished loading once onload is called
//but set a timeout, so that the load event finishes, and all page timers complete (some end after onload finishes)
window.onload = setTimeout(logPerformance, 500);