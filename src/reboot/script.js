document.addEventListener("DOMContentLoaded", async function () {
    const output = document.getElementById("output");
    
    async function addLine(text, status = "") {
        const line = document.createElement("div");
        line.className = "line";

        switch (status) {
            case "OK":
                line.innerHTML = `[  <span class="status-ok">OK</span>  ] ${text}`;
                break;
            case "FAILED":
                line.innerHTML = `[<span class="status-failed">FAILED</span>] ${text}`;
                break;
            case "":
                line.innerHTML = text;
                break;
            case "->":
                line.innerHTML = `         ${text}`;
                break;
            default:
                console.log("PRINT OPTION NOT FOUND");
                line.innerHTML = text;
                break;
        }
        
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;

        /* 30% chance for a random wait */
        if (Math.random() < 0.3) {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 300));
        }        
    }

    await addLine("Starting system check...");



    /* Check hardware */
    await addLine("Checking hardware...");
    await addLine(navigator?.userAgentData !== undefined ? 'User Agent Data supported' : 'User Agent Data not supported', navigator?.userAgentData !== undefined ? "OK" : "FAILED");
    await addLine(navigator?.userAgentData?.mobile === undefined ? "Device Type: Unknown" : (navigator?.userAgentData?.mobile ? "Device Type: Mobile" : "Device Type: Desktop"), navigator?.userAgentData?.mobile === undefined ? "FAILED" : (navigator?.userAgentData?.mobile ? "FAILED" : "OK"));
    await addLine(navigator?.userAgentData?.architecture ? `Architecture: ${navigator?.userAgentData?.architecture}` : "Architecture: Unknown", navigator?.userAgentData?.architecture !== undefined ? "OK" : "FAILED");
    await addLine(navigator?.userAgentData?.platform ? `Platform: ${navigator?.userAgentData?.platform}` : "Platform: Unknown", navigator?.userAgentData?.platform !== undefined ? "OK" : "FAILED");
    await addLine(navigator?.onLine ? "Network Status: Online" : "Network Status: Offline", navigator?.onLine ? "OK" : "FAILED");
    await addLine(navigator?.hardwareConcurrency !== undefined ? `Hardware Concurrency: ${navigator?.hardwareConcurrency}` : "Hardware Concurrency: Unknown", navigator?.hardwareConcurrency === undefined ? "FAILED" : (navigator?.hardwareConcurrency ? "OK" : "FAILED"));
    await addLine(navigator?.deviceMemory ? `Device Memory: ${navigator?.deviceMemory}GB` : "Device Memory: Unknown", navigator?.deviceMemory !== undefined ? "OK" : "FAILED");
    await addLine(navigator?.maxTouchPoints ? `Max Touch Points: ${navigator?.maxTouchPoints}` : "Max Touch Points: Unknown", navigator?.maxTouchPoints !== undefined ? "OK" : "FAILED");
    await addLine(" ");


    /* Check screen */
    await addLine("Checking screen...");
    await addLine(`Screen Resolution: ${screen?.width}x${screen?.height}`, "OK");
    await addLine(`Screen Color Depth: ${screen?.colorDepth}`, screen?.colorDepth !== undefined ? "OK" : "FAILED");
    await addLine(`Screen Orientation: ${screen?.orientation?.type}`, screen?.orientation?.type !== undefined ? "OK" : "FAILED");
    await addLine(" ");


    /* Check browser support */
    await addLine("Checking browser support...");
    await addLine('localStorage' in window ? "Local Storage supported" : "Local Storage not supported", 'localStorage' in window ? "OK" : "FAILED");
    await addLine('sessionStorage' in window ? "Session Storage supported" : "Session Storage not supported", 'sessionStorage' in window ? "OK" : "FAILED");
    await addLine('indexedDB' in window ? "IndexedDB supported" : "IndexedDB not supported", 'indexedDB' in window ? "OK" : "FAILED");
    await addLine('serviceWorker' in navigator ? "Service Worker supported" : "Service Worker not supported", 'serviceWorker' in navigator ? "OK" : "FAILED");
    await addLine('geolocation' in navigator ? "Geolocation supported" : "Geolocation not supported", 'geolocation' in navigator ? "OK" : "FAILED");
    await addLine('getBattery' in navigator ? "Battery Status API supported" : "Battery Status API not supported", 'getBattery' in navigator ? "OK" : "FAILED");
    await addLine('Window' in window ? 'Window Manager supported' : 'Window Manager not supported', 'Window' in window ? "OK" : "FAILED");
    await addLine('requestFullscreen' in document.documentElement ? "Fullscreen API supported" : "Fullscreen API not supported", 'requestFullscreen' in document.documentElement ? "OK" : "FAILED");
    
    await addLine('Notification' in window ? "Notification API supported" : "Notification API not supported", 'Notification' in window ? "OK" : "FAILED");
    await addLine('performance' in window ? "Performance API supported" : "Performance API not supported", 'performance' in window ? "OK" : "FAILED");
    await addLine('RTCPeerConnection' in window ? "WebRTC supported" : "WebRTC not supported", 'RTCPeerConnection' in window ? "OK" : "FAILED");
    await addLine('AudioContext' in window || 'webkitAudioContext' in window ? "Web Audio API supported" : "Web Audio API not supported", 'AudioContext' in window || 'webkitAudioContext' in window ? "OK" : "FAILED");
    await addLine('requestPointerLock' in document.documentElement ? "Pointer Lock API supported" : "Pointer Lock API not supported", 'requestPointerLock' in document.documentElement ? "OK" : "FAILED");
    await addLine(" ");


    /* SYSTEM INFO */
    await addLine("Checking system info...");
    await addLine(navigator.userAgent, "OK");

    await addLine(" ");
    await addLine(" _____     _____ _____ ");
    await addLine("|     |___|     |   __|");
    await addLine("| | | | -_|  |  |__   |");
    await addLine("|_|_|_|___|_____|_____|");
    await addLine(" ");
    await addLine("Version 3.18.3");
    await addLine("Made by @black-backdoor");
    await addLine(" ");

    await new Promise(resolve => setTimeout(resolve, 3000));

    const rand = Math.random();
    if (rand <= 0.3) {
        console.debug("Redirecting to /update/");
        if ('sessionStorage' in window) { sessionStorage.setItem("updateDuration", 5000); }
        window.location.href = "/update/";
    } else {
        console.debug("Redirecting to /");
        window.location.href = "/";
    }
});

