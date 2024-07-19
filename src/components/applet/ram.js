class RAMApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.title = 'RAM Usage';
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
            <svg viewBox="0 0 1024.001 1068.467" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 199.42h1001.74v277.37l-31.744 1.558a9.262 9.262 0 0 0-10.542 9.172 9.26 9.26 0 0 0 10.592 9.166l-.05.006 31.744 1.558v362.763H0V505.64l23.508-7.302c4.555-1.464 7.793-5.663 7.793-10.618s-3.238-9.155-7.714-10.597l-.08-.022L0 469.756zm934.958 66.783H66.784V425.19c19.096 14.387 31.314 37.02 31.314 62.51s-12.217 48.12-31.115 62.364l-.2.143V794.23H934.96V555.15c-24.297-12.603-40.912-37.03-42.245-65.453l-.006-.173v-2.938c1-28.923 17.708-53.723 41.82-66.223l.43-.203zM212.37 369.493h321.892V606.35H212.37zm255.11 66.783H279.15v103.29h188.33zm0-66.783h321.89V606.35H467.48zm255.11 66.783H534.26v103.29h188.33zM194.115 827.622h-66.783V700.29h66.783zm170.073 0h-66.784V700.29h66.783zm170.072 0h-66.78V700.29h66.782zm170.073 0H637.55V700.29h66.783zm170.073 0h-66.783V700.29h66.783z"/>
            </svg>
            <p>${this.percent}%</p>
        `;
    }

    render() {
        if (this.percent < 0) { this.percent = 0; }
        if (this.percent > 100) { this.percent = 100; }

        this.title = `RAM Usage: ${this.percent}%`;

        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }
}

customElements.define('applet-ram', RAMApplet);