import { listenTaskbarOpen } from '/modules/app.js';


listenTaskbarOpen('about', () => {
    window.location.href = '/about/';
});