class Notification extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.name = this.getAttribute('name') ?? 'Notification';
        this.content = this.getAttribute('content') ?? 'This is a notification component';
        this.appName = this.getAttribute('app-name') ?? undefined;
        this.appIcon = this.getAttribute('app-icon') ?? undefined;
        this.icon = this.getAttribute('icon') ?? undefined;
        this.timeAlive = this.getAttribute('time-alive');

        this.render();
    }

    connectedCallback() {
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
                margin-right: 5px;
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
                ${this.appName && this.appIcon ? `<div class="app"><img src="${this.appIcon}" alt="icon"><p class="appname">${this.appName}</p></div>` : `<p class="time">${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}</p>`}
                <button class="close" title="close">✖</button>
            </div>
            <div class="content">
                ${this.icon ? `<div class="icon"><img src="${this.icon}" alt="icon"></div>` : ''}
                <div class="text">
                    <h4>${this.name}</h4>
                    <p>${this.content}</p>
                </div>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['name', 'content', 'icon', 'app-name', 'app-icon', 'time-alive'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name.replace(/-([a-z])/g, g => g[1].toUpperCase())] = newValue;
        }
        if (this.isConnected) {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;

        this.shadowRoot.querySelector(".close").addEventListener("click", this.close);
        if (this.timeAlive) {
            setTimeout(() => { this.close(); }, this.timeAlive);
        }
    }

    close = () => {
        this.remove();
    };
}

customElements.define('desktop-notification', Notification);




/* element for grouping notifications by app */
class NotificationsApp extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.name = this.getAttribute('name') ?? 'Notification';
        this.icon = this.getAttribute('icon') ?? undefined;

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: #fff;
            }

            :host {
                width: 100%;
                /* padding: 10px 0; */
                border-radius: 5px;
                background-color: transparent;

                user-select: none;
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
                <div class="app">${this.icon !== undefined && this.icon !== "undefined" ? `<img src="${this.icon}" alt="icon">` : ''}<p>${this.name}</p></div>
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
    

    /* METHODS */
    close = () => {
        this.remove();
    };

    check_empty = () => {
        if (this.shadowRoot.querySelector("slot").assignedElements().length === 0) {
            this.remove();
        }
    };
}

customElements.define('notifications-app', NotificationsApp);



import { getNotifications } from "../modules/notification.js";

class NotificationsPanel extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.name = this.getAttribute('name') ?? 'Notification';
        this.icon = this.getAttribute('icon') ?? undefined;

        this.render();
        setInterval(() => {
            this.render();
        }, 3000);
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;

                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 5px;
                width: 100%;
            }

            desktop-notification {
                --bg-color: #393939;
            }

            notifications-app {
                margin-top: 10px;
                margin-bottom: 10px;
            }
        `;
    }


    presetNotification(name, content, icon, app_name, app_icon) {
        if (name === undefined) { name = 'Notification'; }
        if (content === undefined) { content = 'This is a notification component'; }
        if (icon === undefined) { icon = ''; }
        if (app_name === undefined) { app_name = ''; }
        if (app_icon === undefined) { app_icon = ''; }

        return `
            <desktop-notification 
                name="${name}"
                content="${content}"
                icon="${icon ?? ''}"
                app-name="${app_name}"
                app-icon="${app_icon}"
            ></desktop-notification>
        `;
    }

    presetGroup(innerHTML, name, icon) {
        return `
            <notifications-app
                name="${name}"
                icon="${icon}"
            >${innerHTML}</notifications-app>
        `;        
    }

    content() {
        const notifications = getNotifications();
        const apps = notifications.map(notification => notification.app_name);
        const uniqueApps = [...new Set(apps)];
        
        let html = ``;

        uniqueApps.forEach(app => {
            const appNotifications = notifications.filter(notification => notification.app_name === app);            
            let notificationHTML = '';
            appNotifications.forEach(notification => {
                notificationHTML += this.presetNotification(notification.app_name, notification.content, notification.icon, notification.app_name, notification.app_icon);
            });

            if (app === undefined) {
                html += notificationHTML;
                return;
            }

            html += this.presetGroup(notificationHTML, app, appNotifications[0].app_icon);
        });

        return html;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.content().trim()}
        `;
    }
}

customElements.define('notifications-panel', NotificationsPanel);