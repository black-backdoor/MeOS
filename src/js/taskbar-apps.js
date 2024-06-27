// <taskbar-app name="About" icon="logo.svg" class="" onclick="openApp(this);"></taskbar-app>

function openApp(element) {
    const taskbarApps = document.querySelectorAll('#taskbar .apps taskbar-app');

    taskbarApps.forEach((app) => {
        app.classList.remove('active');
    });

    if (!element.classList.contains('open')) {
        element.classList.add('open');
    }
    element.classList.add('active');
}