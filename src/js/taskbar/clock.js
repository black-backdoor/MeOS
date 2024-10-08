/* TIME */
document.addEventListener("DOMContentLoaded", function() {
    const showSeconds = false;

    const dateElement = document.querySelector("#taskbar > .time-date > .date");
    const timeElement = document.querySelector("#taskbar > .time-date > .time");
    const timeTitleElement = document.querySelector("#taskbar > .time-date");

    setInterval(function () {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        let time;
        if (showSeconds) {
            time = `${hours}:${minutes}:${seconds}`;
        } else {
            time = `${hours}:${minutes}`;
        }

        timeElement.innerText = time;


        const day = now.getDate().toString().padStart(2, '0');
        const dayName = now.toLocaleDateString('default', { weekday: 'long' });  

        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
        const monthName = now.toLocaleDateString('default', { month: 'long' });

        const year = now.getFullYear();
        const date = `${day}.${month}.${year}`;
        dateElement.innerText = date;

        timeTitleElement.title = `${dayName}, ${day}. ${monthName} ${year}`;
    }, 1000);
});