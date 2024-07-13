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
        `;
    }

    template() {
        return `
            <button>
                <img src="https://img.icons8.com/ios/50/000000/lock-2.png" alt="Lock">
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
