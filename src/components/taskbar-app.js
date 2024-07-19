class taskbarApp extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        
        this.name;
        this.icon;
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                display: block;
                user-select: none;
                cursor: pointer;
                color: white;
            }

            img {
                height: 100%;
            }
        `;
    }

    template() {
        return `
            <img class="icon" src="${this.icon}" alt="icon">
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
            this.render();
        }
    }

    get name() {
        return this.getAttribute('name');
    }
    get icon() {
        return this.getAttribute('icon');
    }
}

customElements.define('taskbar-app', taskbarApp);
