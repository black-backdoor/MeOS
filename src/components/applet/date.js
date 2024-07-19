class AppletDate extends HTMLElement {
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
            <p id="date"></p>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.updateDate();
        this.interval = setInterval(this.updateDate, 1000);
    }

    updateDate = () => {
        const now = new Date();
        const day = now.getDay();
        const month = now.toLocaleString('default', { month: 'short' });
    
        const text = `${day} ${month}`;
        this.shadowRoot.getElementById('date').textContent = text;
    }
}

customElements.define('applet-date', AppletDate);