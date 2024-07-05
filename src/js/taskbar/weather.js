document.addEventListener('DOMContentLoaded', function () {
    /*
        get the icon from the /assets/weather/data.json file
        select random entry from the icons array
        
        entry:
        {
            "icon": "cloud-thunder.svg",
            "temp": 20,
            "desc": "Stormy"
        },

        set the weather icon, temperature and description based on the entry
    */

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

                // Check if the icon should be only displayed only before or after a certain hour
                let conditionsMet = true;
                if (randomIcon?.before && hour >= randomIcon.before) {
                    conditionsMet = false;
                }
                if (randomIcon?.after && hour < randomIcon.after) {
                    conditionsMet = false;
                }

                // Update the weather icon if conditions are met
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