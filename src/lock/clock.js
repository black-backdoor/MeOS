function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.querySelector('.clock .time').textContent = timeString;

    const day = now.getDate().toString().padStart(2, '0');
    const dayName = now.toLocaleDateString('default', { weekday: 'long' });  
    const monthName = now.toLocaleDateString('default', { month: 'long' });
    const dateString = `${dayName} ${day} ${monthName}`;
    document.querySelector('.clock .date').textContent = dateString;
}

setInterval(updateTime, 1000);
updateTime();