/* 
 * Redirects to / if screen size is too small
 */

window.onload = function() {
    function popup() {
        return confirm("Your screen size is too small for this content.");
    }

    if (window.innerWidth < 1170) {
        // Redirect to / if screen width is less than specified
        console.warn(`%c[Warning]%c Screen size is too small for content! min-width is 1170px; currently: ${window.innerWidth};`, 'color: red; font-weight: bold;', 'color: inherit;');
        if(popup() === true) {
            window.location.href = "/";
        }
    }

    if (window.innerHeight < 666) {
        // Redirect to / if screen height is less than specified
        console.warn(`%c[Warning]%c Screen size is too small for content! min-height is 666px; currently: ${window.innerHeight};`, 'color: red; font-weight: bold;', 'color: inherit;');
        if(popup() === true) {
            window.location.href = "/";
        }
    }
};