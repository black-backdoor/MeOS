class AppWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: #fff;
                --head-text-color: #000;
                --body-text-color: #fff;
                --head-bg-color: #fdfdfd;
                --body-bg-color: #e7e7e7;
                --control-close: #df6963;
                --control-minimize: #F2D35B;
                --control-maximize: #97c38a;
                --control-hover-close: #ee3a30;
                --control-hover-minimize: #eec42b;
                --control-hover-maximize: #62d43f;
            }

            @media (prefers-color-scheme: dark) {
                :host {
                    --head-color: #fff;
                    --head-bg-color: #383838;
                    --body-bg-color: #2c2c2c;
                    --control-close: #ee3a30;
                    --control-minimize: #eec42b;
                    --control-maximize: #62d43f;
                    --control-hover-close: red;
                    --control-hover-minimize: darkorange;
                    --control-hover-maximize: #42f30d;
                }
            }

            :host {
                position: absolute;
                min-width: 200px;
                min-height: 120px;
                display: flex;
                flex-direction: column;
            }

            header {
                cursor: grab;
                user-select: none;
                border-radius: 8px 8px 0 0;
                color: var(--head-color);
                background-color: var(--head-bg-color);
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            header .title {
                width: min-content;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* ------- CONTROLS ------- */
            header .controls {
                padding: 0 8px;
                cursor: default;
                position: absolute;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 30px;
                width: 55px;
            }

            header .controls button {
                height: 15px;
                width: 15px;
                border: none;
                border-radius: 50%;
                margin: 0;
                padding: 0;
            }

            header .close {
                background-color: var(--control-close);
            }

            header .minimize {
                background-color: var(--control-minimize);
            }

            header .maximize {
                background-color: var(--control-maximize);
            }

            header .close:hover {
                background-color: var(--control-hover-close);
            }

            header .minimize:hover {
                background-color: var(--control-hover-minimize);
            }

            header .maximize:hover {
                background-color: var(--control-hover-maximize);
            }



            /* ------- MAIN ------- */
            main {
                padding: 10px;
                background-color: var(--body-bg-color);
                flex: 1;
                overflow: hidden;
            }



            /* ------- WINDOW OPTIONS ------- */

            /* FULLSCREEN */
            :host(.fullscreen) {
                top: 0px !important;
                left: 0px !important;
                width: 100% !important;
                height: calc(100vh - var(--taskbar-height)) !important;
                z-index: 3900;
            }

            :host(.fullscreen) > header {
                border-radius: 0;
            }
        `;
    }

    template() {
        return `
            <header title="${this.name}">
                <section class="controls">
                    <button title="minimize" class="minimize"></button>
                    <button title="maximize" class="maximize"></button>
                    <button title="close" class="close"></button>                    
                </section>
                <h3 class="title">${this.name}</h3>
            </header>
            <main>
                <slot></slot>
            </main>
        `;
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
        
        this.shadowRoot.querySelector(".close").addEventListener("click", this.close);
        this.shadowRoot.querySelector(".maximize").addEventListener("click", this.fullscreen);
    }

    get name() {
        return this.getAttribute('name') ?? 'Window';
    }
    set name(value) {
        this.setAttribute('name', value);
    }

    close = () => {
        this.remove();
    }

    fullscreen = () => {
        this.classList.toggle("fullscreen");
    }
}

customElements.define('app-window', AppWindow);
