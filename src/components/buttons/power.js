class PowerButton extends HTMLElement {
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
                background-color: DimGray;
                border-radius: 10px;
                height: 100%;
                width: 100%;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: gray;
            }

            button:active {
                background-color: gray;
            }

            svg {
                fill: white;
                height: 100%;
                width: 100%;
            } 
        `;
    }

    template() {
        return `
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M84.94 36.631a2.11 2.11 0 1 0-2.365 3.5 33.226 33.226 0 1 1-37.822.462 2.111 2.111 0 1 0-2.453-3.442 37.453 37.453 0 1 0 42.636-.52z"/><path d="M66.111 66.21V24.979a2.111 2.111 0 0 0-4.222 0V66.21a2.111 2.111 0 0 0 4.222 0z"/></svg>
            </button>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', this.handle);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.handle);
    }

    handle() {
        window.location.href = '/reboot/';
    }
}

customElements.define('button-power', PowerButton);
