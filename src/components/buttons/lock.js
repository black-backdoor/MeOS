class LockButton extends HTMLElement {
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M24 14v-4a8 8 0 0 0-16 0v4a3.24 3.24 0 0 0-3 3.21v9.54A3.23 3.23 0 0 0 8.23 30h15.54A3.23 3.23 0 0 0 27 26.77v-9.54A3.24 3.24 0 0 0 24 14zM16 4a6 6 0 0 1 6 6v4H10v-4a6 6 0 0 1 6-6zm9 22.77A1.23 1.23 0 0 1 23.77 28H8.23A1.23 1.23 0 0 1 7 26.77v-9.54A1.23 1.23 0 0 1 8.23 16h15.54A1.23 1.23 0 0 1 25 17.23z"/></svg>
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
        window.location.href = '/lock';
    }
}

customElements.define('button-lock', LockButton);
