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
                --bg-color: #fff;
                --border-color: #ddd;
                --header-bg-color: #f1f1f1;
                font-family: Arial, sans-serif;
                display: inline-block;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                overflow: hidden;
                width: 280px;
            }
            .calendar {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: var(--bg-color);
                color: var(--text-color);
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: var(--header-bg-color);
                width: 100%;
                padding: 10px;
                text-align: center;
                font-size: 1.2em;
                border-bottom: 1px solid var(--border-color);
            }
            .days {
                display: flex;
                flex-wrap: wrap;
                padding: 10px;
            }
            .day {
                width: calc(100% / 7);
                text-align: center;
                padding: 5px 0;
                box-sizing: border-box;
            }
            .day.prev-month {
                color: #999;
            }
            .day.next-month {
                color: #999;
            }
            .nav-button {
                cursor: pointer;
                background: none;
                border: none;
                color: #555;
                font-size: 1em;
                padding: 5px 10px;
                margin: 0 5px;
                outline: none;
            }
        `;
    }

    template() {
        return `
            <div class="calendar">
                <div class="header">
                    <button class="nav-button" id="prevMonth">&lt;</button>
                    <div>${this.getMonthYear()}</div>
                    <button class="nav-button" id="nextMonth">&gt;</button>
                </div>
                <div class="days">
                    ${this.renderDays()}
                </div>
            </div>
        `;
    }

    getMonthYear() {
        const month = this.date.toLocaleString('default', { month: 'long' });
        const year = this.date.getFullYear();
        return `${month} ${year}`;
    }

    renderDays() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const lastDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

        const prevMonthLastDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        const daysToShowBefore = firstDay === 0 ? 6 : firstDay - 1;

        let dayCells = '';

        // Previous month days
        for (let i = prevMonthLastDate - daysToShowBefore + 1; i <= prevMonthLastDate; i++) {
            dayCells += `<div class="day prev-month">${i}</div>`;
        }

        // Current month days
        for (let i = 1; i <= lastDate; i++) {
            dayCells += `<div class="day">${i}</div>`;
        }

        // Next month days
        const totalDays = daysToShowBefore + lastDate;
        const remainingDays = 42 - totalDays; // 42 = 6 weeks * 7 days
        for (let i = 1; i <= remainingDays; i++) {
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
