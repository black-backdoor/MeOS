class NetworkRTT extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.title = 'Network RTT';
        this.speed = '?';

        this.render();
        this.init();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: white;
                --icon-color: white;
                --space: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
            }
            
            svg {
                height: 60%;
                margin-right: var(--space);
            }

            svg path {
                stroke: var(--icon-color);
                fill: none;
            }

            p {
                margin: 0;
                padding: 0;
                height: 100%;
                color: var(--text-color);
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
    }

    template() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" viewBox="0 0 24 24">
                <path style="stroke-miterlimit:10;" d="M6 2v21M11 7 6 2 1 7M18 22V1M13 17l5 5 5-5"/>
            </svg>
            ${ typeof(this.speed) === 'number' ? `<p>${this.speed} ms</p>` : `<p>${this.speed}</p>` }
        `;
    }

    render() {
        if (this.speed === 'NaN') {
            this.title = 'RTT monitoring not supported.';
        } else if (this.speed === '?') {
            this.title = 'Fetching RTT...';
        } else {
            this.title = `RTT: ${this.speed} ms`;
        }

        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }

    init() {
        if ('connection' in navigator) {
            const update = () => {
                const connection = navigator.connection;
                this.speed = connection.rtt;
                this.render();
            };

            update();
            setInterval(update, 30000);
        } else {
            this.speed = 'NaN';
            this.render();
            if(this.removeWhenUnsupported === true) {
                this.remove();
            }
        }
    }



    set removeWhenUnsupported(value) {
        if (value) {
            this.setAttribute('remove-when-unsupported', '');
        } else {
            this.removeAttribute('remove-when-unsupported');
        }
    }
    get removeWhenUnsupported() {
        return this.hasAttribute('remove-when-unsupported');
    }
}

customElements.define('applet-network_rtt', NetworkRTT);