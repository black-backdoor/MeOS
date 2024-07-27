document.addEventListener('DOMContentLoaded', function() {
    const taskbarTime = document.querySelector('#taskbar .time-date');
    const actionMenu = document.querySelector('#action-menu');

    taskbarTime.addEventListener('click', function() {
        actionMenu.classList.toggle('open');
    });

    document.addEventListener('mousedown', function(event) {
        if (!actionMenu.contains(event.target) && !taskbarTime.contains(event.target)) {
            actionMenu.classList.remove('open');
        }
    });
});