const lockScreen = document.getElementById('lock-screen');
const passwordInput = document.getElementById('password');

document.body.classList.add('hidden');

document.addEventListener('keypress', function(event) {
    if (lockScreen.classList.contains('hidden')) {
        return;
    }

    if (event.code === 'Space') {
        lockScreen.classList.add('top');
        document.body.classList.remove('hidden');
        document.body.classList.add('appear');
        setTimeout(() => { lockScreen.classList.add('hidden'); }, 500);
        passwordInput.focus();
    }
});
lockScreen.addEventListener('click', function() {
    lockScreen.classList.add('top');
    document.body.classList.remove('hidden');
    document.body.classList.add('appear');
    setTimeout(() => { lockScreen.classList.add('hidden'); }, 500);
    passwordInput.focus();
}, { once: true });





/* DRAG TO UNLOCK (up or right) */
let startX, startY, endX, endY;
let isSwiping = false;

lockScreen.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;
});

lockScreen.addEventListener('touchmove', (e) => {
    if (isSwiping) {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            lockScreen.style.transform = `translateX(${diffX}px)`;
        } else {
            // Vertical swipe
            lockScreen.style.transform = `translateY(${diffY}px)`;
        }
    }
});

lockScreen.addEventListener('touchend', () => {
    isSwiping = false;

    const diffX = endX - startX;
    const diffY = endY - startY;

    const show = function() {
        lockScreen.classList.add('hidden');
        document.body.classList.remove('hidden');
        document.body.classList.add('appear');
    };

    if (Math.abs(diffX) > window.innerWidth / 4) {
        // Unlock on horizontal swipe
        show();
    } else if (Math.abs(diffY) > window.innerHeight / 4) {
        // Unlock on vertical swipe
        show();
    } else {
        // Reset position if swipe is not sufficient
        lockScreen.style.transform = `translateX(0) translateY(0)`;
    }
});