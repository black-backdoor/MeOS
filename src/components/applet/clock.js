class AppletClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    css() {
        return `
            :host {
                --text-color: white;
                display: flex;
                flex-direction: row;
                align-items: center;
                color: var(--text-color);
                gap: 5px;
                user-select: none;
                pointer-events: none;
            }
            :host * {
                margin: 0;
                padding: 0;
            }
        `;
    }

    template() {
        return `
            <p id="time"></p>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.updateTime();
        this.interval = setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.shadowRoot.getElementById('time').textContent = `${hours}:${minutes}`;
    }
}

customElements.define('applet-clock', AppletClock);