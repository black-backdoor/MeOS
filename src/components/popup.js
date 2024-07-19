class Popup extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.icon;
        this.message_title;
        this.message;

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                --ok-color: #166fd1;
                --cancel-color: #878181;
                --text-color: white;
                --bg-color: #484444;

                --ok-text-color: var(--text-color);
                --cancel-text-color: var(--text-color);
            }

            @media (prefers-color-scheme: light) {
                :host {
                    --ok-color: #60a844;
                    --cancel-color: #cfcfcf;
                    --bg-color: #e9e9e9;
                    --text-color: #484848;
                    --ok-text-color: var(--bg-color);
                    border: 1px solid #b0b0b0;
                }
            }



            :host {
                color: var(--text-color);
                background-color: var(--bg-color);
                padding: 20px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                flex-direction: column;
                border-radius: 16px;
                height: 290px;
                width: 350px;
            }


            :host([position]) {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            

            * { 
                box-sizing: border-box;
                text-align: center;
                margin: 0;
            }


            /* ICON */
            .icon-holder {
                flex: 1;
                user-select: none;
                pointer-events: none;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .icon-holder img {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }


            /* TEXT */
            .text {
                width: 100%;
                padding: 20px 0;
            }
            
            h3 { font-size: 20px; margin-bottom: 10px; }
            p { font-size: 16px; }
            h3, p { width: 100%; }


            /* BUTTONS */
            .buttons {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
                width: 100%;
            }

            button {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                border-radius: 8px;
                padding: 10px;
                cursor: pointer;
                font-size: 16px;
            }

            button.ok { background-color: var(--ok-color); color: var(--ok-text-color); }
            button.cancel { background-color: var(--cancel-color); color: var(--cancel-text-color); }
        `;
    }

    template() {
        return `
            <div class="icon-holder">
                <img src="${this.icon}" alt="icon">
            </div>
            <div class="text">
                <h3>${this.message_title}</h3>
                <p>${this.message}</p>
            </div>
            <div class="buttons">
                <button class="cancel">${this.cancel_text}</button>
                <button class="ok">${this.ok_text}</button>
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.shadowRoot.querySelector('.ok').addEventListener('click', this.ok);
        this.shadowRoot.querySelector('.cancel').addEventListener('click', this.cancel);
    }


    close = () => {
        this.remove();
    }

    ok = () => {
        this.dispatchEvent(new CustomEvent('close', { detail: 'ok' }));
        this.close();
    }

    cancel = () => {
        this.dispatchEvent(new CustomEvent('close', { detail: 'cancel' }));
        this.close();
    }

    
    static get observedAttributes() {
        return ['icon', 'message_title', 'message'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }



    get icon() {
        return this.getAttribute('icon');
    }
    set icon(value) {
        this.setAttribute('icon', value);
    }


    get message_title() {
        return this.getAttribute('message_title') || 'Title';
    }
    set message_title(value) {
        this.setAttribute('message_title', value);
    }

    get message() {
        return this.getAttribute('message') || 'Are you sure?';
    }
    set message(value) {
        this.setAttribute('message', value);
    }


    get ok_text() {
        return this.getAttribute('ok_text') || 'OK';
    }
    set ok_text(value) {
        this.setAttribute('ok_text', value);
    }

    set cancel_text(value) {
        this.setAttribute('cancel_text', value);
    }
    get cancel_text() {
        return this.getAttribute('cancel_text') || 'Cancel';
    }

}

customElements.define('desktop-popup', Popup);


/* POPUP VARIANT */


class PopupAskYesNo extends Popup {
    constructor() {
        super();

        this.ok_text = 'Yes';
        this.cancel_text = 'No';
    }
}
customElements.define('desktop-popup_yes_no', PopupAskYesNo);



class PopupInfo extends Popup {
    constructor() {
        super();
        this.icon = '/assets/popup/info.svg';
    }
}
customElements.define('desktop-popup_info', PopupInfo);



class PopupWarning extends Popup {
    constructor() {
        super();
        this.icon = '/assets/popup/warning.svg';
    }
}
customElements.define('desktop-popup_warning', PopupWarning);



class PopupError extends Popup {
    constructor() {
        super();
        this.icon = '/assets/popup/error.svg';
    }
}
customElements.define('desktop-popup_error', PopupError);
