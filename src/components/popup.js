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
            /* COLORS */
            :host {
                --ok-color: #166fd1;
                --cancel-color: #878181;
                --text-color: white;
                --bg-color: #484444;

                color: var(--text-color);
                background-color: var(--bg-color);
                font: inherit;
                padding: 20px;

                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                flex-direction: column;
                border-radius: 16px;
                height: 290px;
                width: 350px;
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
                width: 100%;
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
                color: var(--text-color);
                border: none;
                border-radius: 8px;
                padding: 10px;
                cursor: pointer;
                font-size: 16px;
            }

            button.ok { background-color: var(--ok-color); }
            button.cancel { background-color: var(--cancel-color); }
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
                <button class="cancel">Cancel</button>
                <button class="ok">OK</button>
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
        this.dispatchEvent(new CustomEvent('ok'));
        this.close();
    }

    cancel = () => {
        this.dispatchEvent(new CustomEvent('cancel'));
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

}

customElements.define('desktop-popup', Popup);