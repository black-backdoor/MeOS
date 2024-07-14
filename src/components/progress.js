class UIProgress extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.percent = 0;

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
                --text-color: #11181c;
            }
            
            :host {
                height: 16px;
                width: 200px;
                display: flex;
                align-items: center;
            }

            .label {
                color: var(--text-color);
            }
            
            .bar {
                overflow: hidden;
                width: 100%;
                height: 100%;
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
        `;
    }

    template() {
        return `
            <div class="label"></div>
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
    }


    static get observedAttributes() {
        return ['percent'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'percent') {
            newValue = Number(newValue);
            if(isNaN(newValue)) { return; }
            if(newValue === null) { return; }
            if(newValue === oldValue) { return; }
            if(newValue < 0) { newValue = 0; }
            if(newValue > 100) { newValue = 100; }

            this.percent = newValue;
            console.log(this.percent);
            this.update();
        }
    }
}

customElements.define('ui-progress', UIProgress);