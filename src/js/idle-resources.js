function loadResource(src, type) {
    if (!src || !type) {
        console.error('Resource missing src or type attribute', src, type);
        return;
    }
    
    switch (type) {
        case 'image':
            console.debug(`Loading image: ${src}`);
            const img = new Image();
            img.src = src;
            break;
    }
}

function loadIdleResources() {
    console.log('%c[idle-resource]%c Loading idle resources', 'color: magenta;', 'color: inherit;');
    const resources = document.querySelectorAll('idle-resource');
    console.groupCollapsed(`%c[idle-resource]%c Found ${resources.length} resources`, 'color: magenta;', 'color: inherit;');
    resources.forEach(
        function(resource) {
            const src = resource.getAttribute('src');
            const type = resource.getAttribute('type');
            loadResource(src, type);
        }
    );
    console.groupEnd();
}

// Use requestIdleCallback if available, otherwise fall back to setTimeout
if ('requestIdleCallback' in window) {
    console.debug('%c[idle-resource]%c Using requestIdleCallback', 'color: magenta;', 'color: inherit;');
    requestIdleCallback(loadIdleResources);
} else {
    console.debug('%c[idle-resource]%c Using setTimeout', 'color: magenta;', 'color: inherit;');
    setTimeout(loadIdleResources, 2000);
}
