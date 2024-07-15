class CalendarWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.date = new Date(); // Initialize with current date
        this.disablePickers;
        this.noInput;

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: #000;
                --old-text-color: #999;
                --bg-color: #fff;
                --border-color: #ddd;
                --header-bg-color: #f1f1f1;
                --header-text-hover-color: #808080;
                --nav-button-color: #555;
                --today-color: #007bff;
                font-family: Arial, sans-serif;
                display: inline-block;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                overflow: hidden;
                width: 280px;
                user-select: none;
                position: relative; /* Ensure relative positioning for absolute children */
            }

            @media (prefers-color-scheme: dark) {
                :host {
                    --text-color: #fff;
                    --border-color: none;
                    --bg-color: #393939;
                    --header-bg-color: #292929;
                    --header-text-hover-color: #858585;
                    --nav-button-color: #888;
                }
            }

            :host * { box-sizing: border-box; }

            .calendar {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: var(--bg-color);
                color: var(--text-color);
                position: relative; /* Ensure relative positioning for absolute children */
                z-index: 1; /* Ensure the calendar is above the pickers */
            }

            .header {
                background-color: var(--header-bg-color);
                width: 100%;
                padding: 10px;
                font-size: 18px;
                border-bottom: 1px solid var(--border-color);
                display: none;
            }

            :host([show-today]) .header {
                display: block;
            }

            .header span:hover {
                color: var(--header-text-hover-color);
            }
            
            :host([no-input]) {
                --header-text-hover-color: var(--text-color);
            }

            

            /* INPUTS */
            .nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
                background-color: var(--header-bg-color);
            }
            
            :host([show-today]) .nav {
                background-color: var(--bg-color);
            }

            .nav-button {
                cursor: pointer;
                background: none;
                border: none;
                color: var(--nav-button-color);
                font-size: 1em;
                padding: 5px 5px;
                outline: none;
            }
            :host([no-input]) .nav-button {
                display: none;
            }


            /* DAYS */
            .days {
                display: flex;
                flex-wrap: wrap;
                padding: 10px;
                justify-content: center;
                height: 200px;
                position: relative; /* Ensure relative positioning for absolute children */
                z-index: 1; /* Ensure the days are above the pickers */
            }

            .day-label, .day {
                width: calc(100% / 7);
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .day.prev-month, .day.next-month {
                color: var(--old-text-color);
            }

            .today {
                color: var(--today-color);
                font-weight: bold;
            }

            /* PICKERS */
            .pickers {
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 10px;
                width: 100%;
                height: 200px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                z-index: 2;
                background-color: var(--bg-color);
            }

            :host .pickers { display: none; }
            :host([no-input]) .pickers { display: none; }
            :host([show-pickers]) .pickers { display: flex; }

            #open-pickers {
                color: var(--text-color);
                font-size: 16px;
                border: none;
                background: inherit;
            }

            #picker {
                border: none;
                background: none;
                color: var(--text-color);
            }
        `;
    }

    template() {
        return `
            <div class="calendar">
                <div class="header">
                    <span id="todayDate">${this.getToday()}</span>
                </div>
                <div class="nav">
                    <button id="open-pickers">${this.getMonthYear()}</button>
                    <div class="buttons">
                        <button class="nav-button" id="prevMonth">&lt;</button>
                        <button class="nav-button" id="today">●</button>
                        <button class="nav-button" id="nextMonth">&gt;</button>
                    </div>
                </div>
                <div class="days">
                    ${this.renderWeekDays()}
                    ${this.renderDays()}
                </div>
                <div class="pickers">
                    <input type="date" class="month-picker" id="picker" value="${this.date.toISOString().split('T')[0]}">
                </div>
            </div>
        `;
    }


    resetToCurrentMonth() {
        this.date = new Date(); // Reset to current date
        this.render();
    }

    getToday() {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    }

    getMonthYear() {
        const month = this.date.toLocaleString('default', { month: 'long' });
        const year = this.date.getFullYear();
        return `${month} ${year}`;
    }

    renderWeekDays() {
        return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => `<div class="day-label">${day}</div>`).join('');
    }

    renderDays() {
        const today = new Date();
        const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        const prevMonthLastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        const daysToShowBefore = firstDay === 0 ? 6 : firstDay - 1;
        const daysToShowAfter = 42 - daysToShowBefore - lastDate; // 42 = 6 rows * 7 days

        let dayCells = '';

        // Previous month days
        for (let i = prevMonthLastDate - daysToShowBefore + 1; i <= prevMonthLastDate; i++) {
            dayCells += `<div class="day prev-month">${i}</div>`;
        }

        // Current month days
        for (let i = 1; i <= lastDate; i++) {
            if (this.date.getFullYear() === today.getFullYear() && this.date.getMonth() === today.getMonth() && i === today.getDate()) {
                dayCells += `<div class="day today">${i}</div>`;
            } else {
                dayCells += `<div class="day">${i}</div>`;
            }
        }

        // Next month days
        for (let i = 1; i <= daysToShowAfter; i++) {
            dayCells += `<div class="day next-month">${i}</div>`;
        }

        return dayCells;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.shadowRoot.getElementById('prevMonth').addEventListener('click', () => this.prevMonth());
        this.shadowRoot.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
        this.shadowRoot.getElementById('todayDate').addEventListener('click', () => this.resetToCurrentMonth());
        this.shadowRoot.getElementById('today').addEventListener('click', () => this.resetToCurrentMonth());
        this.shadowRoot.getElementById('open-pickers').addEventListener('click', () => this.togglePickers());

        this.shadowRoot.getElementById('picker').addEventListener('change', (e) => { this.date = new Date(e.target.value); this.render(); });

        if (this.disablePickers) { this.shadowRoot.getElementById('open-pickers').disabled = true; }
        if (this.noInput) { this.shadowRoot.getElementById('open-pickers').disabled = true; }
    }

    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    }

    togglePickers() {
        if (this.disablePickers) { this.removeAttribute('show-pickers'); return; }

        if (this.hasAttribute('show-pickers')) {
            this.removeAttribute('show-pickers');
        } else {
            this.setAttribute('show-pickers', '');
        }
    }



    static get observedAttributes() {
        return ['disablePickers', 'no-input', 'show-today'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    set disablePickers(value) {
        if (value) {
            this.setAttribute('disablePickers', '');
        } else {
            this.removeAttribute('disablePickers');
        }
    }

    get disablePickers() {
        return this.hasAttribute('disablePickers');
    }


    set noInput(value) {
        if (value) {
            this.setAttribute('no-input', '');
        } else {
            this.removeAttribute('no-input');
        }
    }
    get noInput() {
        return this.hasAttribute('no-input');
    }
}

customElements.define('calendar-widget', CalendarWidget);
