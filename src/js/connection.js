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
/*
    ```HTML
    <div class="internet-access icon"
        title="Winternet&#013No connection"
        online-title="WiFi-Name&#013Internet access"
        offline-title="No internet access&#013No connections available"
        >

        <img alt="Wifi"
            src="/icon/connection/wifi.svg"
            src-yes="/icon/connection/wifi.svg"
            src-no="/icon/connection/no-wifi.svg"
        >
    </div>
    ```
    the src-yes attribute represents the connected wifi icon, and the src-no attribute represents the disconnected wifi icon.
    the online-title attribute represents the title when the wifi is connected, and the offline-title attribute represents the title when the wifi is disconnected.
*/

function setWifiStatus(status){
    /*
     * Set the wifi status on the taskbar
     * @param {boolean} status - the wifi status
     * @return {void}
     */

    
    if(typeof status !== 'boolean'){ console.warn("[setWifiStatus] Status should be a boolean  | input", typeof status); return; }

    const wifi = document.querySelector("#taskbar .menu .internet-access");
    const wifiIcon = document.querySelector("#taskbar .menu .internet-access img");
    const yes_src = wifiIcon.getAttribute("src-yes");
    const no_src = wifiIcon.getAttribute("src-no");

    const onlineTitle = wifi.getAttribute("online-title");
    const offlineTitle = wifi.getAttribute("offline-title");

    if(status) {
        wifiIcon.src = yes_src;
        wifi.title = onlineTitle;
        console.debug("[setWifiStatus] Wifi is connected");
    } else {
        wifiIcon.src = no_src;
        wifi.title = offlineTitle;
        console.debug("[setWifiStatus] Wifi is not connected");
    }
    
}
