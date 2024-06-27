document.addEventListener('DOMContentLoaded', function() {
    const taskbarTime = document.querySelector('#taskbar section.time');
    const actionMenu = document.querySelector('#action-menu');

    taskbarTime.addEventListener('click', function() {
        actionMenu.classList.toggle('open');
    });
});