document.addEventListener('DOMContentLoaded', () => {
    /* SET USERNAME | QUERY PARAM */
    const username = document.getElementById('username');
        
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const usernameParam = params.get('username') || 'User';
    username.innerText = usernameParam;
});


document.addEventListener('DOMContentLoaded', () => {
    /* POPULATE USERS */
    const users = {
        'MeOS': 'meos',
        'Admin': 'admin',
        'root': 'toor',
        'groot': 'groot',
    };

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


document.addEventListener('DOMContentLoaded', () => {
    /* SWITCH USER */
    const usersElement = document.querySelector('.users');
    const userElements = usersElement.querySelectorAll('.user');
    userElements.forEach(userElement => {
        userElement.addEventListener('click', () => {
            const selectedUser = userElement.querySelector('.username').innerText;
            window.location.href = `/login-screen?username=${selectedUser}`;
        });
    });
});



//  passwordSec.style.animation = 'shake 0.4s ease-in-out';