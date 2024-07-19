class ClockDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --text-color: white;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: var(--text-color);
                    gap: 5px;
                    user-select: none;
                    pointer-events: none;
                }
                :host * {
                    margin: 0;
                    padding: 0;
                }
            </style>
            <p id="time"></p>
        `;
    }

    connectedCallback() {
        this.updateTime();
        this.interval = setInterval(() => this.updateTime(), 1000);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        this.shadowRoot.getElementById('time').textContent = `${hours}:${minutes}`;
    }
}

customElements.define('applet-clock', ClockDisplay);