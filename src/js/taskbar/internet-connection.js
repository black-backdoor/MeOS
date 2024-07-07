document.addEventListener('DOMContentLoaded', function() {
    // initial check
    setWifiStatus(navigator.onLine);
    console.info("[Connection] Initial check: ", navigator.onLine);

    // add event listeners
    window.addEventListener('online', function() {
        console.info("[Connection] Wifi is connected");
        setWifiStatus(true);
    });

    window.addEventListener('offline', function() {
        console.info("[Connection] Wifi is not connected");
        setWifiStatus(false);
    });
    
});




/* CONNECTION */
function setWifiStatus(status){
    /*
     * Set the wifi status on the taskbar
     * @param {boolean} status - the wifi status
     * @return {void}
     */

    
    if(typeof status !== 'boolean'){ console.warn("[setWifiStatus] Status should be a boolean  | input", typeof status); return; }

    const wifi = document.querySelector("#taskbar .applets .internet-access");
    const wifiIcon = document.querySelector("#taskbar .applets .internet-access img");
    const yes_src = wifiIcon.getAttribute("src-online");
    const no_src = wifiIcon.getAttribute("src-offline");

    const onlineTitle = wifi.getAttribute("title-online");
    const offlineTitle = wifi.getAttribute("title-offline");

    if(status) {
        wifiIcon.src = yes_src;
        wifi.title = onlineTitle;
        console.debug("[setWifiStatus] set Wifi to connected");
    } else {
        wifiIcon.src = no_src;
        wifi.title = offlineTitle;
        console.debug("[setWifiStatus] set Wifi to connected");
    }
    
}
