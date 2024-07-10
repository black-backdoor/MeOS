const users = {
    'MeOS': 'meos',
    'Admin': 'admin',
    'root': 'toor',
    'groot': 'groot',
};

const user = "MeOS";



/* POPULATE USERS */
document.addEventListener('DOMContentLoaded', () => {
    const usersElement = document.querySelector('.users');
    usersElement.innerHTML = '';
    Object.entries(users).forEach(([username, password]) => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
            <p class="avatar">${username[0].toUpperCase()}</p>
            <div class="username">${username}</div>
        `;
        usersElement.appendChild(userElement);
    });
});



/* SWITCH USER */
document.addEventListener('DOMContentLoaded', () => {
    const usersElement = document.querySelector('.users');
    const userElements = usersElement.querySelectorAll('.user');
    userElements.forEach(userElement => {
        userElement.addEventListener('click', () => {
            const username = userElement.querySelector('.username').textContent;
            console.log(`Switching to user: ${username}`);
            // SWITCH USER
        });
    });
});



/* SHOW PASSWORD */
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const showPasswordButton = document.getElementById('show-password');
    const hidePassword = () => {
        passwordInput.setAttribute('type', 'password');
        passwordInput.setAttribute('autocomplete', 'current-password');
    };
    const showPassword = () => {
        passwordInput.setAttribute('type', 'text');
        passwordInput.setAttribute('autocomplete', 'off');
    }

    showPasswordButton.addEventListener('mousedown', showPassword);
    showPasswordButton.addEventListener('mouseup', hidePassword);
    showPasswordButton.addEventListener('mouseleave', hidePassword);
});