class Notification extends HTMLElement {
    constructor() {
        super();

        this.name = this.getAttribute('name') ?? 'Notification';
        this.content = this.getAttribute('content') ?? 'This is a notification component';

        this.appname = this.getAttribute('app-name') ?? undefined;
        this.appicon = this.getAttribute('app-icon') ?? undefined;
        this.icon = this.getAttribute('icon') ?? undefined;

        this.time_alive = this.getAttribute('time-alive');

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: #fff;
                --bg-color: #292929;
            }
            
            :host {
                display: block;
                border-radius: 5px;
                background-color: var(--bg-color);

                box-sizing: border-box;
                padding: 14px;

                height: 120px;
                width: 300px;
                overflow: hidden;

                user-select: none;
            }


            /* ACTIONS */
            .top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: var(--bg-color);
            }

            .top * {
                margin: 0;
                padding: 0;
                color: var(--text-color);
            }
            
            .top img {
                height: 20px;
                width: 20px;
                margin-right: 5px;
            }

            .top .app {
                display: flex;
                align-items: center;
            }

            /* close button */
            .top button {
                background-color: inherit;
                padding: 0;
                border: none;
                cursor: pointer;
            }
            

            /* CONTENT */
            .content {
                display: flex;
                justify-content: space-between;
                align-items: center;

                height: 72px;
            }

            /* icon */
            .icon {
                height: 60px;
                width: 60px;
            }
            .icon > img {
                width: 100%;
                height: 100%;
            }

            /* text */
            .text {
                flex-grow: 1;
            }
            .text * {
                margin: 0;
                color: var(--text-color);
            }
        `;
    }

    template() {
        return `
            <div class="top">
                ${this.appname != "undefined" && this.appicon != "undefined" ? `<div class="app"><img src="${this.appicon}" alt="icon"><p class="appname">${this.appname}</p></div>` : `<p class="time">${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}</p>`}
                <button class="close" title="close">✖</button>
            </div>
            <div class="content">
                ${this.icon != "undefined" ? `<div class="icon"><img src="${this.getAttribute('icon')}" alt="icon"></div>` : ''}
                <div class="text">
                    <h4>${this.getAttribute('name')}</h4>
                    <p>${this.getAttribute('content')}</p>
                </div>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['name', 'content', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
        }
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;

        this.shadowRoot.querySelector(".close").addEventListener("click", this.close);
        if (this.time_alive) { setTimeout(() => { this.close(); }, this.time_alive); }
    }

    
    /* ATTRIBUTES */
    /* content attributes */
    get name() {
        return this.getAttribute('name');
    }
    set name(value) {
        this.setAttribute('name', value);
    }

    get content() {
        return this.getAttribute('content');
    }
    set content(value) {
        this.setAttribute('content', value);
    }


    /* app attributes */
    get appname() {
        return this.getAttribute('app-name');
    }
    set appname(value) {
        this.setAttribute('app-name', value);
    }

    get appicon() {
        return this.getAttribute('app-icon');
    }
    set appicon(value) {
        this.setAttribute('app-icon', value);
    }


    /* icon attributes */
    get icon() {
        return this.getAttribute('icon');
    }
    set icon(value) {
        this.setAttribute('icon', value);
    }

    /* METHODS */
    close = () => {
        this.remove();
    }
}

customElements.define('desktop-notification', Notification);




/* element for grouping notifications by app */
class NotificationsApp extends HTMLElement {
    constructor() {
        super();

        this.name = this.getAttribute('name') ?? 'Notification';
        this.icon = this.getAttribute('icon') ?? undefined;

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: #fff;
            }

            :host {
                width: 100%;
                padding: 10px 0;
                border-radius: 5px;
                background-color: transparent;
            }

            /* TEXT + ICON */
            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 5px;
            }

            header * {
                margin: 0;
                padding: 0;
                color: var(--text-color);
            }

            header img {
                width: 30px;
                height: 30px;
                margin-right: 5px;
            }
            
            header p {
                margin: 0;
            }

            header .app {
                display: flex;
                align-items: center;
            }

            /* close button */
            header button {
                background-color: inherit;
                padding: 0;
                border: none;
                cursor: pointer;
            }

            /* NOTIFICATIONS */
            slot {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 5px;
                width: 100%;
            }
        `;
    }

    template() {
        return `
            <header>
                <div class="app">${this.icon !== undefined && this.icon !== "undefined" ? `<img src="${this.icon}">` : ''}<p>${this.name}</p></div>
                <button class="close" title="close">✖</button>
            </header>
            <slot></slot>
        `;
    }

    static get observedAttributes() {
        return ['name', 'icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
        }
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;

        this.shadowRoot.querySelector(".close").addEventListener("click", this.close);
        this.shadowRoot.addEventListener("click", this.check_empty);
    }

    
    /* ATTRIBUTES */
    get name() {
        return this.getAttribute('name');
    }
    set name(value) {
        this.setAttribute('name', value);
    }

    get icon() {
        return this.getAttribute('icon');
    }
    set icon(value) {
        this.setAttribute('icon', value);
    }


    /* METHODS */
    close = () => {
        this.remove();
    }

    check_empty = () => {
        if (this.shadowRoot.querySelector("slot").assignedElements().length === 0) {
            this.remove();
        }
    }
}

customElements.define('notifications-app', NotificationsApp);