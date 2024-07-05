class taskbarApp extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        
        this.name = this.getAttribute('name') ?? 'App';
        this.icon = this.getAttribute('icon') ?? '';
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            /* STATES
            .open: when the app is open
            .active: when the app is the current focused app
            */

            :host {
                user-select: none;
                cursor: pointer;
                height: 40px;
                width: 40px;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                background-color: transparent;
            }
            :host(:hover) {
                background-color: #292929;
            }
            :host(.active) {
                background-color: #292929;
            }
            :host(.active:hover) {
                background-color: #303030;
            }

            :host(:active) {
                transform: scale(0.95);
            }

            .icon {
                width: 32px;
                height: 32px;
            }

            .underline {
                position: relative;
                bottom: 0;
                width: 6px;
                height: 3px;
                border-radius: 2px;
            }

            :host(.open) .underline {
                background-color: #9e9e9e;
            }

            :host(.active) .underline {
                width: 12px;
                background-color: #0078d4;
            }
        `;
    }

    template() {
        return `
            <img class="icon" src="${this.icon}">
            <div class="underline"></div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.title = this.name;
    }

    static get observedAttributes() {
        return ['name', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }
}

customElements.define('taskbar-app', taskbarApp);
