class ChartSquare extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.animation;

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                --fill-color: #6f6f6f;
                --bg-color: #111;  
            }

            :host {
                display: flex;
                background-color: var(--bg-color);
                border-radius: 2px;
                padding: 2px;
            }

            .timeslice {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                width: 6px;
                margin-top: 6px;
            }

            .timeslice .entry {
                background-color: var(--fill-color);
                width: 4px;
                height: 4px;
                border-radius: 1px;
                margin: 1px;
            }


            /* ANIMATION */
            @keyframes fadeIn {
                to {
                    opacity: 1;
                }
            }


            /* ANIMATIONS */

            /* fill */
            :host([animation="fill"]) .timeslice { opacity: 0; }
            :host([animation="fill"]) .timeslice.appear { animation: fadeIn 0.5s forwards; }


            /* rain */
            :host([animation^="rain"]) .entry { opacity: 0; }
            :host([animation^="rain"]) .entry.appear { animation: fadeIn 0.5s forwards; }
        `;
    }

    template() {
        return ``;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }

    showData(data) {
        // check if reduced motion is enabled
        const animationNotAllowed = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (animationNotAllowed) { this.removeAttribute('animation'); console.log("[ChartSquare] Animation disabled due to reduced motion"); }

        const animation = this.getAttribute('animation');
        console.debug("[ChartSquare] Animation:", animation);


        data.forEach((column, index) => {
            // column = each value in data

            const timeslice = document.createElement('div');
            timeslice.classList.add('timeslice');

            for (let i = 0; i < column; i++) {
                // each block in the column

                const entry = document.createElement('div');
                entry.classList.add('entry');
                timeslice.appendChild(entry);

                let time;

                switch (animation) {
                    case "rain-down":
                        time = i * 100;
                        break;
                    case "rain-up":
                        time = (column - i) * 100;
                        break;
                }

                setTimeout(() => {
                    entry.classList.add('appear');
                }, time);
            }

            this.shadowRoot.appendChild(timeslice);
            
            if(animation == "fill") {
                setTimeout(() => {
                    timeslice.classList.add('appear');
                }, index * 50);
            }
        });
    }

    
}

customElements.define('chart-square', ChartSquare);
