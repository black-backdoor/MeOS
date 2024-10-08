class WifiApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.onlineTitle = this.getAttribute('title-online') || 'WiFi-Name\nInternet access';
        this.offlineTitle = this.getAttribute('title-offline') || 'No internet access\nNo connections available';
        this.srcOnline = this.getAttribute('src-online') || '/assets/connection/wifi.svg';
        this.srcOffline = this.getAttribute('src-offline') || '/assets/connection/no-wifi.svg';
        this.preloadImages();
        this.render();
    }

    connectedCallback() {
        this.setWifiStatus(navigator.onLine);
        window.addEventListener('online', () => this.setWifiStatus(true));
        window.addEventListener('offline', () => this.setWifiStatus(false));
    }

    preloadImages() {
        // Preload the offline image
        console.log("[preloadImages] Preloading offline image");
        const offlineImage = new Image();
        offlineImage.src = this.srcOffline;
    }

    checkLoadImage(url, callbackSuccess, callbackError) {
        const img = new Image();
        img.onload = callbackSuccess;
        img.onerror = callbackError;
        img.src = url;
    }

    setWifiStatus(status) {
        const wifiIcon = this.shadowRoot.querySelector('img');
        
        if (status) {
            this.checkLoadImage(
                this.srcOnline,
                () => {
                    wifiIcon.src = this.srcOnline;
                    this.setAttribute('title', this.onlineTitle);
                    console.debug("[setWifiStatus] set Wifi to connected");
                },
                () => {
                    console.error("[setWifiStatus] Error loading online image");
                }
            );
        } else {
            this.checkLoadImage(
                this.srcOffline,
                () => {
                    wifiIcon.src = this.srcOffline;
                    this.setAttribute('title', this.offlineTitle);
                    console.debug("[setWifiStatus] set Wifi to disconnected");
                },
                () => { 
                    console.error("[setWifiStatus] Error loading offline image");
                }
            );
        }
    }

    css() {
        return `
            :host {
                display: inline-block;
                user-select: none;
            }

            img {
                height: 100%;
                width: 100%;
            }
        `;
    }

    template() {
        return `
            <img alt="Wifi" src="${this.srcOnline}">
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }
}

customElements.define('applet-wifi', WifiApplet);
