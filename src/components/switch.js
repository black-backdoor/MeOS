/*
    <ui-switch></ui-switch>
    --------------------------
    Options:
    - checked
    - disabled 

    Events:
    - toggle

    Functions:
    - .disabled = true/false
    - .checked = true/false

    CSS Variants:
    - blocky (add class blocky to the component)

    CSS Variables:
    take a look at the :host block
*/



class UISwitch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.disabled = this.hasAttribute('disabled');
        this.checked = this.hasAttribute('checked');

        this.render();
    }

    connectedCallback() {
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
            :host([disabled]) .slider {
                cursor: not-allowed;
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

            :host(.blocky) .slider {
                border-radius: 0px;
            }
            :host(.blocky) .slider:before {
                border-radius: 0px;
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
        this.shadowRoot.querySelector('input').addEventListener('change', this._toggle.bind(this));
        this.update();
    }

    update() {
        if (this.disabled) { 
            this.shadowRoot.querySelector('input').setAttribute('disabled', '');
        } else {
            this.shadowRoot.querySelector('input').removeAttribute('disabled');
        }

        if (this.checked) { 
            this.shadowRoot.querySelector('input').setAttribute('checked', '');
        } else {
            this.shadowRoot.querySelector('input').removeAttribute('checked');
        }
    }

    _toggle(event) {
        this.dispatchEvent(new CustomEvent('toggle', {
            detail: { checked: event.target.checked }
        }));
    }

    
    static get observedAttributes() {
        return ['disabled', 'checked'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'disabled':
                    this.disabled = this.hasAttribute('disabled');
                    break;
                case 'checked':
                    this.checked = this.hasAttribute('checked');
                    break;
            }
            this.update();
        }
    }
    
    /* DISABLED */
    set disabled(value) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }


    /* CHECKED */
    set checked(value) {
        if (value) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    get checked() {
        return this.hasAttribute('checked');
    }
}

customElements.define('ui-switch', UISwitch);
