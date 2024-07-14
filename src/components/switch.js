class UISwitch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.disabled = this.hasAttribute('disabled');

        this.render();
    }

    css() {
        return `
            :host {
                --on-color: #2196F3;
                --off-color: #ccc;
                --button-color: #fff;

                --disabled-on-color: #2178BD;
                --disabled-off-color: #9e9e9e;
                --disabled-button-color: #fff;
            }

            :host([disabled]) {
                cursor: not-allowed;

                --on-color: var(--disabled-on-color);
                --off-color: var(--disabled-off-color);
                --button-color: var(--disabled-button-color);
            }
            
            .switch {
                position: relative;
                display: block;
                width: 60px;
                height: 34px;
            }
    
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
    
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--off-color);
                transition: .4s;
                border-radius: 34px;
            }
    
            .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: var(--button-color);
                transition: .4s;
                border-radius: 50%;
            }
    
            input:checked + .slider {
                background-color: var(--on-color);
            }
    
            input:checked + .slider:before {
                transform: translateX(26px);
            }
        `;
    }

    template() {
        return `
            <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
            </label>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        if (this.disabled) {
            this.shadowRoot.querySelector('input').setAttribute('disabled', '');
        }

        this.shadowRoot.querySelector('input').addEventListener('change', this._toggle.bind(this));
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                this.disabled = this.hasAttribute('disabled');
                console.log("attributeChangedCallback", name, this.disabled);
            }
            this.render();
        }
    }
    
    set disabled(value) {
        console.log("set disabled", value);

        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    _toggle(event) {
        this.dispatchEvent(new CustomEvent('toggle', {
            detail: { checked: event.target.checked }
        }));
    }
}

customElements.define('ui-switch', UISwitch);
