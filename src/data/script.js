function calculateSize(storage) {
    let total = 0;
    for (let key in storage) {
        if (storage.hasOwnProperty(key)) {
            total += ((storage[key].length + key.length) * 2);
        }
    }
    return (total / 1024).toFixed(2); // Convert to KB
}

function updateStorageInfo() {
    const localStorageSize = calculateSize(localStorage);
    const sessionStorageSize = calculateSize(sessionStorage);

    document.getElementById('localStorageSize').textContent = `localStorage: ${localStorageSize} KB`;
    document.getElementById('sessionStorageSize').textContent = `sessionStorage: ${sessionStorageSize} KB`;
}

function clearAllStorage() {
    localStorage.clear();
    sessionStorage.clear();
    updateStorageInfo();
    document.getElementById('localStorageEntries').textContent = '';
    document.getElementById('sessionStorageEntries').textContent = '';
    alert('All storage data has been deleted.');
}

function showStorageEntries() {
    let localStorageEntries = '';
    let sessionStorageEntries = '';

    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            localStorageEntries += `${key}: ${localStorage.getItem(key)}\n`;
        }
    }

    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            sessionStorageEntries += `${key}: ${sessionStorage.getItem(key)}\n`;
        }
    }

    document.getElementById('localStorageEntries').textContent = localStorageEntries;
    document.getElementById('sessionStorageEntries').textContent = sessionStorageEntries;
}

// Initial update
updateStorageInfo();