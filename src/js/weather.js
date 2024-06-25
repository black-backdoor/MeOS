document.addEventListener('DOMContentLoaded', function () {
    const weather = document.querySelector('#taskbar > .weather');
    const weatherIcon = weather.querySelector('img');
    const weatherTemp = weather.querySelector('.text > .temp');
    const weatherDesc = weather.querySelector('.text > .desc');

    fetch('/assets/weather/data.json')
        .then(response => response.json())
        .then(data => {
            const baseURL = data.baseURL;
            const icons = data.icons;

            function updateWeatherIcon() {
                const randomIcon = icons[Math.floor(Math.random() * icons.length)];
                const hour = new Date().getHours();

                let conditionsMet = true;
                if (randomIcon?.before && hour >= randomIcon.before) {
                    conditionsMet = false;
                }
                if (randomIcon?.after && hour < randomIcon.after) {
                    conditionsMet = false;
                }

                if (conditionsMet) {
                    weatherIcon.src = baseURL + randomIcon.icon;
                    weatherTemp.textContent = randomIcon.temp + "°C";
                    weatherDesc.textContent = randomIcon.desc;
                    weather.title = `${randomIcon.temp}°C ${randomIcon.desc}`;
                } else {
                    // Generate a new icon until conditions are met
                    updateWeatherIcon();
                }
            }

            updateWeatherIcon();
        });
});