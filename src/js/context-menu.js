document.addEventListener("DOMContentLoaded", function() {
    const contextMenu = document.querySelector('#context-menu');
    const scope = document.querySelector('body');

    const maxHeight = document.body.clientHeight / 2.5;


    // ? if the context menu is too heigh, add a scrollbar
    if (contextMenu.clientHeight > maxHeight) {
        contextMenu.classList.add('scroll');
        console.info("The context menu is too heigh for the screen. Please make it smaller.");
    }



    const normalizePosition = (mouseX, mouseY) => {
        // ? get the width and height of the context menu
        const contextMenuWidth = contextMenu.clientWidth;
        const contextMenuHeight = contextMenu.clientHeight;

        // ? compute what is the mouse position relative to the container element (scope)
        const {
            left: scopeOffsetX,
            top: scopeOffsetY,
        } = scope.getBoundingClientRect();
    
        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;


        // ? check if the element will go out of bounds
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



    scope.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        
        const { clientX: mouseX, clientY: mouseY } = event;
        const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY);

        contextMenu.style.top = `${normalizedY}px`;
        contextMenu.style.left = `${normalizedX}px`;

        normalizePosition(mouseX, mouseY);

        contextMenu.classList.add('visible');
        document.body.classList.add('context-menu-open')
    });


    scope.addEventListener("mousedown", (e) => {
        /*
            If the user clicks outside of the context menu, close it.
            This is done by checking if the target's offsetParent is the context menu.
        */
        
        if (e.target !== contextMenu && !contextMenu.contains(e.target)) {
            console.debug("clicked outside of the context menu");
            contextMenu.classList.remove('visible');
            document.body.classList.remove('context-menu-open');
        } 
    });

    contextMenu.addEventListener('click', function(e) {
        if (contextMenu.contains(e.target) && e.target.tagName === "BUTTON") {
            console.debug("clicked on a button inside the context menu");
            contextMenu.classList.remove('visible');
            document.body.classList.remove('context-menu-open')
        }
    });
});


