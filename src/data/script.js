function calculateStorageSize(storage) {
    if (!storage) { return; }
    if (storage !== localStorage && storage !== sessionStorage) { return; }

    let size = {};

    let totalSize = 0,
        keyLength, key;

    for (key in storage) {
        if (!storage.hasOwnProperty(key)) {
            continue;
        }
        keyLength = ((storage[key].length + key.length) * 2);
        totalSize += keyLength;

        size[key] = keyLength;
    };

    const total = (totalSize / 1024).toFixed(2) + " KB";
    
    return {
        total,
        size
    };
}


if ('localStorage' in window) {
    const { total, size } = calculateStorageSize(localStorage);
    const progressBar = document.querySelector('#localStorageProgress');
    
    progressBar.setAttribute('label', `localStorage: ${total} of 10000 KB`);
    progressBar.removeAttribute('isIndeterminate');

    const maxSize = 10000;
    const currentSize = total.replace(' KB', '');
    const percentage = (currentSize / maxSize) * 100;

    progressBar.setAttribute('percent', percentage);
}



if ('sessionStorage' in window) {
    const { total, size } = calculateStorageSize(sessionStorage);
    const progressBar = document.querySelector('#sessionStorageProgress');
    
    progressBar.setAttribute('label', `sessionStorage: ${total} of 10000 KB`);
    progressBar.removeAttribute('isIndeterminate');

    const maxSize = 10000;
    const currentSize = total.replace(' KB', '');
    const percentage = (currentSize / maxSize) * 100;

    progressBar.setAttribute('percent', percentage);
}







const deleteAllButton = document.querySelector('#deleteAll');

deleteAllButton.addEventListener('click', () => {
    const oldPopup = document.querySelector('#sureDeleteAll');
    if (oldPopup) {
        oldPopup.remove();
    }

    // use a template to create the popup
    const template = document.querySelector('#popupTemplate');
    const popupNode = template.content.cloneNode(true);
    document.body.appendChild(popupNode);

    // get the newly created popup
    const popup = document.querySelector('#sureDeleteAll');
    popup.classList.remove('hidden');

    popup.addEventListener('close', (event) => {
        if (event.detail == 'ok') {
            deleteAll();
        }
    });
});





function deleteAll() {
    if ('localStorage' in window) {
        localStorage.clear();
    }
    if ('sessionStorage' in window) {
        sessionStorage.clear();
    }
    window.location.reload();
}