class UIProgress extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.percent = 0;
        this.label;

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            /* COLORS */
            :host {
                --fill-color: #006fee;
                --bg-color: #e9e9eb;
                --text-color: rgb(17, 24, 28);
            }
            
            :host {
                height: 16px;
                width: 200px;
                display: flex;
                flex-direction: column;
            }

            .label {
                color: var(--text-color);
                height: 16px;
                font-size: 16px;
                margin-bottom: 4px;
            }
            
            .bar {
                overflow: hidden;
                width: 100%;
                height: 100%;
                max-height: 16px;
                background-color: var(--bg-color);
            }
            
            .fill {
                position: relative;
                transform: translateX(-${100 - this.percent}%);
                transition-duration: .5s;
                height: 100%;
                background-color: var(--fill-color);
            }


            /* INDETERMINATE */
            :host([isIndeterminate]) .fill {
                transform: translateX(-30%);
                transition-property: transform;
                transition-timing-function: cubic-bezier(.4,0,.2,1);
                animation:indeterminate-bar 1.5s cubic-bezier(.65,.815,.735,.395) infinite normal none running;
            }
            @keyframes indeterminate-bar {
                0% {
                    transform:translateX(-50%) scaleX(.2)
                }
                to {
                    transform:translateX(100%) scaleX(1)
                }
            }


            /* ROUND */
            :host([bar-style="round"]) .bar {
                border-radius: 9999px;
            }
            :host([bar-style="round"]) .fill {
                border-radius: 9999px;
            }
            

            /* NO ANIMATION */
            :host([no-animation]) .fill {
                transition-duration: 0s;
            }

            /* LABEL */
            .label {
                display: none;
            }
            :host([label]) .label {
                display: inherit;
            }
        `;
    }

    template() {
        return `
            <span class="label"></span>
            <div class="bar">
                <div class="fill"></div>
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.update();
    }

    update() {
        this.shadowRoot.querySelector('.fill').style.transform = `translateX(-${100 - this.percent}%)`;
        this.shadowRoot.querySelector('.label').textContent = this.label;
    }


    static get observedAttributes() {
        return ['percent', 'label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue === oldValue) { return; }
        this.update();
    }

    
    set percent(value) {

        value = Number(value);
        if (isNaN(value)) { return; }
        if (value === null) { return; }
        value = Math.round(value);
        if (value < 0) { value = 0; }
        if (value > 100) { value = 100; }

        this.setAttribute('percent', value);        
    }
    get percent() {
        return Number(this.getAttribute('percent'));
    }

    
    set label(value) {
        this.setAttribute('label', value);
    }
    get label() {
        return this.getAttribute('label');
    }
}

customElements.define('ui-progress', UIProgress);