class NetworkDown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.title = 'Network Down';
        this.speed = 0;  // in Mbps

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
                <path style="stroke-miterlimit:10;" d="M12 18.67V.5M4.35 11.02 12 18.67l7.65-7.65M4.35 22.5h15.3"/>
            </svg>
            <p>${this.speed} Mbps</p>
        `;
    }

    render() {
        this.title = `Down: ${this.speed} Mbps`;

        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }

    init() {
        if ('connection' in navigator) {
            const update = () => {
                const connection = navigator.connection;
                this.speed = connection.downlink;
                this.render();
            };

            update();
            setInterval(update, 30000);
        }
    }

}

customElements.define('applet-network_down', NetworkDown);