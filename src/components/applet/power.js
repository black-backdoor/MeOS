class PowerApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
            :host {
                display: block;
                width: 100px;
                height: 100px;
                user-select: none;
            }

            #powerButton {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                height: 100%;
                width: 100%;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                background-color: transparent;
            }

            #powerButton:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }

            #powerButton:active {
                background-color: rgba(255, 255, 255, 0.4);
            }

            #powerButton svg {
                fill: white;
                height: 100%;
                width: 100%;
            } 

            .menu {
                display: none;
                position: absolute;
                top: 110%;
                left: 0;
                background: #333;
                border-radius: 5px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 1;
                min-width: 140px;
            }

            .menu.active {
                display: block;
            }

            button.menu-item {
                border: none;
                background: none;
            }
            
            .menu-item {
                display: flex;
                align-items: center;
                text-align: left;
                width: 100%;
                padding: 10px;
                color: white;
                cursor: pointer;
            }

            .menu-item:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }

            .menu-item svg {
                height: 20px;
                padding-right: 5px;
                fill: white;
            }
        `;
    }

    template() {
        return `
            <button id="powerButton" title="Power">
                <svg data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M84.94 36.631a2.11 2.11 0 1 0-2.365 3.5 33.226 33.226 0 1 1-37.822.462 2.111 2.111 0 1 0-2.453-3.442 37.453 37.453 0 1 0 42.636-.52z"/><path d="M66.111 66.21V24.979a2.111 2.111 0 0 0-4.222 0V66.21a2.111 2.111 0 0 0 4.222 0z"/></svg>
            </button>
            <div class="menu" id="powerMenu">
                <button class="menu-item" id="lock" title=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>Lock</button>
                <button class="menu-item" id="hibernate" title="Turns off the PC but apps stay open. When the PC is turned on, you're back where you left off."><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>Hibernate</button>
                <button class="menu-item" id="shutdown" title="Closes all apps and turns off the PC."><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"/></svg>Shutdown</button>
                <button class="menu-item" id="reboot" title="Closes all apps, turns off the PC and then turns it on again."><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>Reboot</button>
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        const button = this.shadowRoot.getElementById('powerButton');
        const menu = this.shadowRoot.getElementById('powerMenu');

        const hibernate = this.shadowRoot.getElementById('hibernate');
        const shutdown = this.shadowRoot.getElementById('shutdown');
        const reboot = this.shadowRoot.getElementById('reboot');
        const lock = this.shadowRoot.getElementById('lock');

        button.addEventListener('click', () => {
            menu.classList.toggle('active');
            this.adjustMenuPosition(menu);
        });

        window.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                menu.classList.remove('active');
            }
        });


        hibernate.addEventListener('click', () => {
            console.log('Hibernate clicked');
            // Add hibernate functionality here
        });

        shutdown.addEventListener('click', () => {
            console.log('Shutdown clicked');
            // Add shutdown functionality here
        });

        reboot.addEventListener('click', () => {
            window.location.href = '/reboot/';
        });

        lock.addEventListener('click', () => {
            window.location.href = '/lock/';
        });
    }

    adjustMenuPosition(menu) {
        const rect = menu.getBoundingClientRect();
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;

        if (rect.right > viewWidth) {
            menu.style.left = `${viewWidth - rect.right - 10}px`;
        }

        if (rect.bottom > viewHeight) {
            menu.style.top = `${viewHeight - rect.bottom - 10}px`;
        }
    }
}

customElements.define('applet-power', PowerApplet);
