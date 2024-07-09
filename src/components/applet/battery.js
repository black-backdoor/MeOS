class BatteryApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.title = 'Battery status: fetching...';
        this.charging = false;
        this.fill = 0;
        this.text = '?';

        this.render();
        this.init();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            svg {
                width: 40px;
                height: 40px;
                fill: white;
            }
        `;
    }

    template() {
        if (this.text != '' && this.fill != 0) console.warn('BatteryApplet: text and fill are both set');
        
        return `
            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 2048 2048" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd">
                <style>
                    ${ this.text ? '' : '.text { display: none; }' }
                    ${ this.charging ? '' : '.charging { display: none; }' }

                    /* FILL */
                    ${ this.fill < 1 ? '.fill-1 { display: none; }' : '' }
                    ${ this.fill < 2 ? '.fill-2 { display: none; }' : '' }
                    ${ this.fill < 3 ? '.fill-3 { display: none; }' : '' }
                    ${ this.fill < 4 ? '.fill-4 { display: none; }' : '' }
                    ${ this.fill < 5 ? '.fill-5 { display: none; }' : '' }
                    ${ this.fill < 6 ? '.fill-6 { display: none; }' : '' }
                    ${ this.fill < 7 ? '.fill-7 { display: none; }' : '' }
                    ${ this.fill < 8 ? '.fill-8 { display: none; }' : '' }
                    ${ this.fill < 9 ? '.fill-9 { display: none; }' : '' }
                    ${ this.fill < 10 ? '.fill-10 { display: none; }' : '' }
                </style>
                <g>
                    <g>
                        <!-- BORDER --><path d="M1674.24 770.169V874.24h85.761c17.673 0 32 14.328 32 32v235.52c0 17.674-14.327 32.002-32 32.002h-85.761v104.069c0 36.013-14.71 68.73-38.408 92.43-23.698 23.697-56.417 38.407-92.429 38.407H386.833c-36.012 0-68.73-14.71-92.428-38.408-23.698-23.7-38.408-56.416-38.408-92.43V770.17c0-36.013 14.71-68.73 38.408-92.43 23.698-23.698 56.417-38.408 92.428-38.408h1156.57c36.012 0 68.731 14.71 92.429 38.408 23.697 23.7 38.408 56.417 38.408 92.43zm-64.002 136.071V770.169c0-18.346-7.53-35.05-19.657-47.18-12.127-12.127-28.832-19.656-47.178-19.656H386.833c-18.346 0-35.05 7.53-47.178 19.657-12.127 12.128-19.657 28.833-19.657 47.179v507.662c0 18.346 7.53 35.05 19.657 47.18 12.128 12.127 28.832 19.656 47.178 19.656h1156.57c18.346 0 35.05-7.53 47.178-19.657 12.128-12.129 19.657-28.833 19.657-47.179v-136.07c0-17.673 14.328-32 32.001-32H1728V938.24h-85.76c-17.674 0-32.002-14.328-32.002-32z" />
                        <!-- TEXT --><text class="text" style="font-family: Arial, sans-serif; font-size: 564.4px; font-weight: 700; text-transform: capitalize; white-space: pre; text-anchor: middle;" x="965.164" y="1218.665">${this.text}</text>
                        <!-- BOLT --><path class="charging" d="M 2023.852 678.123 L 1924.935 678.123 L 1944.064 563.378 C 1946.46 548.901 1935.33 535.73 1920.64 535.73 L 1798.372 535.73 C 1786.767 535.73 1776.871 544.131 1774.971 555.547 L 1735.41 792.868 C 1732.99 807.344 1744.143 820.516 1758.81 820.516 L 1853.739 820.516 L 1853.739 1010.373 L 2043.833 714.694 C 2053.991 698.889 2042.647 678.123 2023.852 678.123 Z"/>
                        <path class="fill-1" d="M467.188 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-1" d="M467.188 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-1" d="M467.188 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-2" d="M584.95 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-2" d="M584.95 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-2" d="M584.95 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-3" d="M702.713 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-3" d="M702.713 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-3" d="M702.713 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-4" d="M820.476 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-4" d="M820.476 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-4" d="M820.476 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-5" d="M938.239 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-5" d="M938.239 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-5" d="M938.239 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-6" d="M1056 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-6" d="M1056 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-6" d="M1056 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-7" d="M1173.77 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-7" d="M1173.77 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-7" d="M1173.77 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-8" d="M1291.53 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-8" d="M1291.53 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-8" d="M1291.53 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-9" d="M1409.29 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-9" d="M1409.29 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-9" d="M1409.29 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                        <path class="fill-10" d="M1527.05 773.76c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V773.76z" />
                        <path class="fill-10" d="M1527.05 979.84c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32V979.84z" />
                        <path class="fill-10" d="M1527.05 1185.92c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v88.32c0 17.673 14.328 32.001 32.001 32.001s32.001-14.328 32.001-32v-88.321z" />
                    </g>
                </g>
            </svg>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;
    }

    updateBatteryStatus(battery) {
        const text_percent = false;

        function convertSecondsToTime(seconds) {
            if (seconds === Infinity) return '∞';
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}h ${minutes}m`;
        }

        const { level, charging } = battery;
        const percent = Math.round(level * 100);
        let message = `Battery status: ${percent}% `;

        if (charging) {
            if (battery.chargingTime === Infinity) {
                message += 'available (plugged in)';
            } else {
                message += `(${convertSecondsToTime(battery.chargingTime)} until full)`;
            }
        } else {
            if (battery.dischargingTime === Infinity) {
                message += 'remaining';
            } else {
                message += `(${convertSecondsToTime(battery.dischargingTime)} left)`;
            }
        }

        this.title = message;
        this.charging = charging;

        if (text_percent) {
            this.fill = 0;
            this.text = percent;
        } else {
            this.fill = Math.round(level * 10);
            this.text = '';
        }

        this.render();

        console.debug(`%c[setBatteryStatus]%c battery title updated to: '${message}'`, 'color: green', 'color: inherit');
        console.info(
            `%c[setBatteryStatus]%c battery level: %c${percent}% %cand battery is %c${charging ? 'charging' : 'discharging'}`,
            'color: green',
            'color: inherit',
            `color: ${percent <= 20 ? 'red' : percent <= 50 ? 'orange' : 'green'}`,
            'color: inherit',
            `color: ${charging ? 'green' : 'red'}`,
        );

        console.debug("IsCharging", charging);
        console.debug("Percentage", percent);
        console.debug("chargingTime", battery.chargingTime);
        console.debug("dischargingTime", battery.dischargingTime);
    }

    init() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then((battery) => {
                console.info('%c[setBatteryStatus]%c battery status is supported', 'color: green', 'color: inherit');
                battery.addEventListener('chargingchange', () => this.updateBatteryStatus(battery));
                battery.addEventListener('chargingtimechange', () => this.updateBatteryStatus(battery));
                battery.addEventListener('dischargingtimechange', () => this.updateBatteryStatus(battery));
                battery.addEventListener('levelchange', () => this.updateBatteryStatus(battery));
                this.updateBatteryStatus(battery);
            });
        } else {
            console.info('%c[setBatteryStatus]%c battery status is not supported', 'color: red', 'color: inherit');
            this.title = 'Battery API is not supported';
            this.charging = false;
            this.fill = 0;
            this.text = 'X';
            this.render();
        }
    }
}

customElements.define('applet-battery', BatteryApplet);