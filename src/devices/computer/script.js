function power_button() {
    const led = document.querySelector('.green-light');
    led.classList.toggle('off');

    const isOn = !led.classList.contains('off');
    const iframe = document.querySelector('.content');
    if (isOn) {
        iframe.src = '/reboot/';
    } else {
        iframe.src = '';
    }
}