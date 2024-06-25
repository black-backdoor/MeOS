document.addEventListener('DOMContentLoaded', function() {
    const weather = document.querySelector('#taskbar > .weather');
    const weatherIcon = weather.querySelector('img');
    const weatherTemp = weather.querySelector('.text > .temp');
    const weatherDesc = weather.querySelector('.text > .desc');

    fetch('/assets/weather/data.json')
        .then(response => response.json())
        .then(data => {
            const baseURL = data.baseURL;
            const icons = data.icons;

            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            weatherIcon.src = baseURL + randomIcon.icon;
            weatherTemp.textContent = randomIcon.temp + "°C";
            weatherDesc.textContent = randomIcon.desc;
        });
});