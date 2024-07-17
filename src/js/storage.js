if ('storage' in navigator) {
    function convertStorageUnit(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let unitIndex = 0;
        while (bytes >= 1024) {
            bytes /= 1024;
            unitIndex++;
        }
        return `${bytes.toFixed(1)} ${units[unitIndex]}`;
    }

    navigator.storage.estimate().then((estimate) => {
        const { quota, usage, usageDetails } = estimate;

        console.info(`%c[Storage]%c Using ${convertStorageUnit(usage)} of ${convertStorageUnit(quota)}`, 'color: DarkOrchid', 'color: inherit');
        console.groupCollapsed(`%c[Storage]%c Usage Details (${convertStorageUnit(usage)})`, 'color: DarkOrchid', 'color: inherit');
        for (const key in usageDetails) {
            console.debug(`%c${key}%c ${convertStorageUnit(usageDetails[key])}`, 'color: DarkOrchid', 'color: inherit');
        }
        console.groupEnd();
    });
}



function calculateLocalStorageSize() {
    let size = {};

    let totalSize = 0,
        keyLength, key;

    for (key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        keyLength = ((localStorage[key].length + key.length) * 2);
        totalSize += keyLength;

        size[key] = keyLength;
    };

    const total = (totalSize / 1024).toFixed(2) + " KB";
    console.info(`%c[Storage]%c localStorage: ${total}`, "color: DarkOrchid", "color: inherit");
    console.groupCollapsed(`%c[Storage]%c localStorage (${total})`, "color: DarkOrchid", "color: inherit");
    for (key in size) {
        console.debug(`${key} = ${(size[key] / 1024).toFixed(2)} KB`);
    }
    console.groupEnd();
}

if ('localStorage' in window) {
    calculateLocalStorageSize();
}




function calculateSessionStorageSize() {
    let size = {};

    let totalSize = 0,
        keyLength, key;

    for (key in sessionStorage) {
        if (!sessionStorage.hasOwnProperty(key)) {
            continue;
        }
        keyLength = ((sessionStorage[key].length + key.length) * 2);
        totalSize += keyLength;

        size[key] = keyLength;
    };

    const total = (totalSize / 1024).toFixed(2) + " KB";
    console.info(`%c[Storage]%c sessionStorage: ${total}`, "color: DarkOrchid", "color: inherit");
    console.groupCollapsed(`%c[Storage]%c sessionStorage (${total})`, "color: DarkOrchid", "color: inherit");
    for (key in size) {
        console.debug(`${key} = ${(size[key] / 1024).toFixed(2)} KB`);
    }
    console.groupEnd();
}

if ('sessionStorage' in window) {
    calculateSessionStorageSize();
}
