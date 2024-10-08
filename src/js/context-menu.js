
function handleContextMenu (contextMenu, bindTarget) {
    if (contextMenu === null || contextMenu === undefined) { console.warn("The context menu is not defined."); return; }
    if (bindTarget === null || bindTarget === undefined) { console.warn("The bind target is not defined."); return; }

    if (contextMenu instanceof HTMLElement === false) { console.warn("The context menu is not an HTMLElement."); return; }
    if (bindTarget instanceof HTMLElement === false) { console.warn("The bind target is not an HTMLElement."); return; }

    const scope = document.body;
    const maxHeight = document.body.clientHeight / 2.5;

    // if the context menu is too heigh, add a scrollbar
    if (contextMenu.clientHeight > maxHeight) {
        contextMenu.classList.add('scroll');
        console.warn("The context menu is too heigh for the screen. Please make it smaller.");
    }


    const normalizePosition = (mouseX, mouseY) => {
        // get the width and height of the context menu
        const contextMenuWidth = contextMenu.clientWidth;
        const contextMenuHeight = contextMenu.clientHeight;

        // compute what is the mouse position relative to the container element (scope)
        const {
            left: scopeOffsetX,
            top: scopeOffsetY,
        } = scope.getBoundingClientRect();
    
        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;


        // check if the element will go out of bounds
        // scopeX + contextMenu.clientWidth = position of the bottom right corner of the context menu
        const outOfBoundsX = scopeX + contextMenu.clientWidth > scope.clientWidth;
        const outOfBoundsY = scopeY + contextMenu.clientHeight > scope.clientHeight;


        let normalizedX = mouseX;
        let normalizedY = mouseY;

        if (outOfBoundsX) {
            normalizedX = mouseX - contextMenuWidth;
        }

        if (outOfBoundsY) {
            normalizedY = mouseY - contextMenuHeight;
        }

        return { normalizedX, normalizedY };
    };


    const closeContextMenu = (e) => {
        /*
            If the user clicks outside of the context menu, close it.
            This is done by checking if the target's offsetParent is the context menu.
        */
        
        if (e.target !== contextMenu && !contextMenu.contains(e.target)) {
            console.debug("clicked outside of the context menu");
            contextMenu.removeAttribute('visible');
            document.body.classList.remove('context-menu-open');

            // remove the event listener (if the context menu is closed, we don't need it anymore)
            scope.removeEventListener('click', closeContextMenu);
        } 
    };


    bindTarget.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        event.stopPropagation(); // prevent the event from bubbling up -> trigger the next context menu e.g. on the body
        scope.dispatchEvent(new Event('click')); // close the other context menus
        
        
        const { clientX: mouseX, clientY: mouseY } = event;
        const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY);

        contextMenu.style.top = `${normalizedY}px`;
        contextMenu.style.left = `${normalizedX}px`;

        normalizePosition(mouseX, mouseY);

        contextMenu.setAttribute('visible', '');
        document.body.classList.add('context-menu-open');

        // add an event listener to close the context menu when the user clicks outside of it
        scope.addEventListener('click', closeContextMenu);
    });

    /* DISABLE CONTEXT MENU ON CONTEXT MENU */
    contextMenu.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    contextMenu.addEventListener('click', function(e) {
        if (contextMenu.contains(e.target) && e.target.tagName === "BUTTON") {
            console.debug("clicked on a button inside the context menu");
            contextMenu.removeAttribute('visible');
            document.body.classList.remove('context-menu-open');

            // remove the event listener (if the context menu is closed, we don't need it anymore)
            scope.removeEventListener('click', closeContextMenu);
        }
    });
}