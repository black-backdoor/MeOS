class CPUApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.title = 'CPU Usage';
        this.percent = Math.round(Math.random() * 100);

        this.render();
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
                fill: var(--icon-color);
            }

            p {
                margin: 0;
                padding: 0;
                width: min-content;
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
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
            </svg>
            <p>${this.percent}%</p>
        `;
    }

    render() {
        if (this.percent < 0) { this.percent = 0; }
        if (this.percent > 100) { this.percent = 100; }

        this.title = `CPU Usage: ${this.percent}%`;

        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }
}

customElements.define('applet-cpu', CPUApplet);