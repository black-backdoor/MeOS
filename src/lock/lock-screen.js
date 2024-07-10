const lockScreen = document.getElementById('lock-screen');

document.addEventListener('keypress', function(event) {
    if (lockScreen.classList.contains('hidden')) {
        return;
    }

    if (event.code === 'Space') {
        lockScreen.classList.add('hidden');
    }
});