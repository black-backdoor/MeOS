class WeatherApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.title = 'Fetching Weather...';

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                user-select: none;
                display: flex;
                align-items: center;

                --text-color: #fff;
                --secondary-text-color: #5d5d5d;
            }

            img {
                height: 90%;
            }


            /* Text */
            h2, p {
                margin: 0;
                font-size: 14px;
            }

            :host([design="compact"]) {
                h2 {
                    font-size: 16px;
                    font-weight: normal;
                }
                p {
                    display: none;
                }
            }



            h2 {
                color: var(--text-color);
            }

            p {
                color: var(--secondary-text-color);
            }
        `;
    }

    template() {
        return `
            <img class="weather" src="/assets/weather/sunny-day.svg" alt="weather">
            <div>
                <h2 class="temp">20°C</h2>
                <p class="desc">Cloudy</p>
            </div>
        `;
    }

    preloadImage(url, successCallback) {
        let img = new Image();
        img.onload = function() {
            successCallback();
        };
        img.onerror = function() {};
        img.src = url;
    }

    updateWeather() {
        const weather = this;
        const weatherIcon = this.shadowRoot.querySelector('img');
        const weatherTemp = this.shadowRoot.querySelector('.temp');
        const weatherDesc = this.shadowRoot.querySelector('.desc');

        fetch('/assets/weather/data.json')
            .then(response => response.json())
            .then(data => {
                const baseURL = data.baseURL;
                const icons = data.icons;
                const hour = new Date().getHours();

                // filter icons based on the conditions
                const filteredIcons = icons.filter(icon => {
                    if (icon.before && hour >= icon.before) {
                        return false;
                    }
                    if (icon.after && hour < icon.after) {
                        return false;
                    }
                    return true;
                });

                // get a random icon
                const icon = filteredIcons[Math.floor(Math.random() * filteredIcons.length)];
                
                const imageUrl = baseURL + icon.icon;
                this.preloadImage(imageUrl, function() {
                    weatherIcon.src = imageUrl;
                    weatherTemp.textContent = icon.temp + "°C";
                    weatherDesc.textContent = icon.desc;
                    weather.title = `${icon.temp}°C ${icon.desc}`;
                });
            });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.updateWeather();
    }
}

customElements.define('applet-weather', WeatherApplet);



