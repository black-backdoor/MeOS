class UISwitch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
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
                background-color: #ccc;
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
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
    
            input:checked + .slider {
                background-color: #2196F3;
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
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('input').addEventListener('change', this._toggle.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('input').removeEventListener('change', this._toggle.bind(this));
    }

    _toggle(event) {
        this.dispatchEvent(new CustomEvent('toggle', {
            detail: { checked: event.target.checked }
        }));
    }
}

customElements.define('ui-switch', UISwitch);
