window.onload = function() {
    function checkScreenSize() {
        const minWidth = parseInt(document.body.getAttribute('data-min-width'), 10) || 0;
        const minHeight = parseInt(document.body.getAttribute('data-min-height'), 10) || 0;

        if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
            console.warn(`%c[Warning]%c Screen size is too small for content! min-width is ${minWidth}px; min-height is ${minHeight}px; currently: ${window.innerWidth}px x ${window.innerHeight}px;`, 'color: red; font-weight: bold;', 'color: inherit;');
            return confirm("Your screen size is too small for this content. Do you want to go back?");
        }
        return false;
    }

    if (checkScreenSize()) {
        // Handle redirection or other actions here
        window.location.href = "/";
    }
};
