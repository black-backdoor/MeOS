const users = {
    'MeOS': 'meos',
    'Admin': 'admin',
    'root': 'toor',
    'groot': 'groot',
};

console.group(`%c[LOGIN]%c Found ${Object.keys(users).length} Users`, 'color: orange', 'color: inherit');
Object.entries(users).forEach(([username, password]) => {
    console.debug(`Name: %c${username}%c, Password: %c${password}`, 'color: DodgerBlue', 'color: inherit', 'color: DodgerBlue');
});
console.groupEnd();




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
    console.debug(`%c[LOGIN]%c Populated ${Object.keys(users).length} Users`, 'color: orange', 'color: inherit');
});



/* SWITCH USER */
document.addEventListener('DOMContentLoaded', () => {
    const usersElement = document.querySelector('.users');
    const userElements = usersElement.querySelectorAll('.user');
    const avatarElement = document.getElementById('avatar');
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');

    userElements.forEach(userElement => {
        userElement.addEventListener('click', () => {
            const username = userElement.querySelector('.username').textContent;
            console.debug(`%c[LOGIN]%c Switching to user: %c${username}`, 'color: orange', 'color: inherit', 'color: DodgerBlue');

            // Update the UI with the selected user's information
            avatarElement.src = `/lock/user.svg`;
            usernameElement.textContent = username;
            passwordElement.value = '';
            passwordElement.focus();
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



/* LOGIN */
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const usernameElement = document.getElementById('username');
    const passwordShow = document.getElementById('show-password');

    function wrongPassword() {
        passwordInput.value = '';
        passwordShow.style.animation = 'shake 0.5s';
        passwordInput.style.animation = 'shake 0.5s';
        setTimeout(
            function() {
                passwordInput.style.animation = '';
                passwordShow.style.animation = '';    
            }, 500);
        passwordInput.focus();
    }

    function tryLogin(username, password) {
        console.debug(`%c[LOGIN]%c Attempting to login as: %c${username}`, 'color: orange', 'color: inherit', 'color: DodgerBlue');
        if (users[username] === password) {
            console.debug(`%c[LOGIN]%c Login successful!`, 'color: orange', 'color: lightgreen');
            window.location.href = '/';
        } else {
            console.debug(`%c[LOGIN]%c Login failed!`, 'color: orange', 'color: red');
            wrongPassword();
        }
    }

    passwordInput.addEventListener('keyup', event => {
        const username = usernameElement.textContent;
        const password = passwordInput.value;

        if (event.key === 'Enter') {
            console.debug(`%c[LOGIN]%c Enter key pressed!`, 'color: orange', 'color: inherit');
            tryLogin(username, password);   
        } 
        else {
            if(password.length >= users[username].length){
                console.debug(`%c[LOGIN]%c Password length reached!`, 'color: orange', 'color: inherit'); 
                tryLogin(String(username), String(password));
            }
        }
    });
});