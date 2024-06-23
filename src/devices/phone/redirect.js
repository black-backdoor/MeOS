/* 
 * Redirects to / if screen size is too small
 */

window.onload = function() {
    function popup() {
        return confirm("Your screen size is too small for this content.");
    }

    if (window.innerWidth < 440) {
        // Redirect to mobile.html if screen width is less than 440px
        console.warn(`%c[Warning]%c Screen size is too small for content! min-width is 440px; currently: ${window.innerWidth};`, 'color: red; font-weight: bold;', 'color: inherit;');
        if(popup() === true) {
            window.location.href = "/";
        }
    }

    if (window.innerHeight < 650) {
        // Redirect to mobile.html if screen height is less than 650px
        console.warn(`%c[Warning]%c Screen size is too small for content! min-height is 650px; currently: ${window.innerHeight};`, 'color: red; font-weight: bold;', 'color: inherit;');
        if(popup() === true) {
            window.location.href = "/";
        }
    }
};