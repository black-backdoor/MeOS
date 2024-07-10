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
            window.location.href = `/lock?username=${selectedUser}`;
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    
    /* SHOW PASSWORD */
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

    /* CHECK PASSWORD */
    const password = 'meos';
    function checkPassword() {
        const passwordValue = passwordInput.value;
        passwordInput.value = '';
        if (passwordValue === password) {
            alert('Correct Password!');
        } else {
            alert('Incorrect Password!');
        }
    }

    passwordInput.addEventListener('input', () => {
        const passwordValue = passwordInput.value;
        if (passwordValue.length == password.length) {
            /* add delay to wait until you can be sure the user has finished typing */
            checkPassword();
        }
    });

    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkPassword();
        }
    });
});