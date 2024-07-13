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
            }

            button {
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

            button:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }

            button:active {
                background-color: rgba(255, 255, 255, 0.4);
            }

            svg {
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
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                z-index: 1;
                min-width: 120px;
            }

            .menu.active {
                display: block;
            }

            .menu-item {
                padding: 10px;
                color: white;
                cursor: pointer;
            }

            .menu-item:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
    }

    template() {
        return `
            <button id="powerButton">
                <svg data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M84.94 36.631a2.11 2.11 0 1 0-2.365 3.5 33.226 33.226 0 1 1-37.822.462 2.111 2.111 0 1 0-2.453-3.442 37.453 37.453 0 1 0 42.636-.52z"/><path d="M66.111 66.21V24.979a2.111 2.111 0 0 0-4.222 0V66.21a2.111 2.111 0 0 0 4.222 0z"/></svg>
            </button>
            <div class="menu" id="powerMenu">
                <div class="menu-item" id="shutdown">Shutdown</div>
                <div class="menu-item" id="reboot">Reboot</div>
                <div class="menu-item" id="lock">Lock</div>
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
        this.title = 'Power';

        const button = this.shadowRoot.getElementById('powerButton');
        const menu = this.shadowRoot.getElementById('powerMenu');
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

        shutdown.addEventListener('click', () => {
            console.log('Shutdown clicked');
            // Add shutdown functionality here
        });

        reboot.addEventListener('click', () => {
            console.log('Reboot clicked');
            // Add reboot functionality here
        });

        lock.addEventListener('click', () => {
            console.log('Lock clicked');
            // Add lock functionality here
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
