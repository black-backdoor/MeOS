class CalendarWidget extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.date = new Date(); // Initialize with current date
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
                --header-text-hover-color: #383838;
                --nav-button-color: #555;
                --today-color: #007bff; /* Blue color for today's date */
                font-family: Arial, sans-serif;
                display: inline-block;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                overflow: hidden;
                width: 280px;
                user-select: none;
            }
            .calendar {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: var(--bg-color);
                color: var(--text-color);
            }
            .header {
                background-color: var(--header-bg-color);
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                font-size: 18px;
                border-bottom: 1px solid var(--border-color);
            }
            .header:hover {
                color: var(--header-text-hover-color);
            }
            .nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            .nav-button {
                cursor: pointer;
                background: none;
                border: none;
                color: var(--nav-button-color);
                font-size: 1em;
                padding: 5px 10px;
                outline: none;
            }
            .days {
                display: flex;
                flex-wrap: wrap;
                padding: 10px;
                justify-content: center;
                height: 200px;
            }
            .day-label {
                width: calc(100% / 7);
                text-align: center;
                font-weight: bold;
                color: var(--text-color);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .day {
                width: calc(100% / 7);
                text-align: center;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .day.prev-month {
                color: var(--old-text-color);
            }
            .day.next-month {
                color: var(--old-text-color);
            }
            .today {
                color: var(--today-color);
                font-weight: bold;
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
                    <div>${this.getMonthYear()}</div>
                    <div class="buttons">
                        <button class="nav-button" id="prevMonth">&lt;</button>
                        <button class="nav-button" id="nextMonth">&gt;</button>
                    </div>
                </div>
                <div class="days">
                    <div class="day-label">Mo</div>
                    <div class="day-label">Tu</div>
                    <div class="day-label">We</div>
                    <div class="day-label">Th</div>
                    <div class="day-label">Fr</div>
                    <div class="day-label">Sa</div>
                    <div class="day-label">Su</div>
                    ${this.renderDays()}
                </div>
            </div>
        `;
    }
    
    resetToCurrentMonth() {
        console.debug('resetToCurrentMonth');
        this.date = new Date(); // Reset to current date
        this.render();
    }

    getToday() {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const date = new Date();
        return date.toLocaleDateString(undefined, options);
    }

    getMonthYear() {
        const month = this.date.toLocaleString('default', { month: 'long' });
        const year = this.date.getFullYear();
        return `${month} ${year}`;
    }

    renderDays() {
        const today = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

        const prevMonthLastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        const daysToShowBefore = firstDay === 0 ? 6 : firstDay - 1;
        const daysToShowAfter = 42 - daysToShowBefore - lastDate;

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
    }

    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.render();
    }
}

customElements.define('calendar-widget', CalendarWidget);
