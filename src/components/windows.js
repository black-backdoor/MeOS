class AppWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
            :host {
                --text-color: #fff;
                --border-color: #e0e0e0;
                --head-text-color: #000;
                --body-text-color: #fff;
                --head-bg-color: #fdfdfd;
                --body-bg-color: #e7e7e7;
                --control-close: #df6963;
                --control-minimize: #F2D35B;
                --control-maximize: #97c38a;
                --control-hover-close: #ee3a30;
                --control-hover-minimize: #eec42b;
                --control-hover-maximize: #62d43f;
            }

            @media (prefers-color-scheme: dark) {
                :host {
                    --head-color: #fff;
                    --border-color: #3f3f3f;
                    --head-bg-color: #383838;
                    --body-bg-color: #2c2c2c;
                    --control-close: #ee3a30;
                    --control-minimize: #eec42b;
                    --control-maximize: #62d43f;
                    --control-hover-close: red;
                    --control-hover-minimize: darkorange;
                    --control-hover-maximize: #42f30d;
                }
            }

            :host {
                position: absolute;
                min-width: 200px;
                min-height: 120px;
                display: flex;
                flex-direction: column;
                border: 1px var(--border-color) solid;
                border-radius: 8px 8px 0 0;
            }

            header {
                cursor: grab;
                user-select: none;
                border-radius: 8px 8px 0 0;
                color: var(--head-color);
                background-color: var(--head-bg-color);
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            header .title {
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;

                height: 100%;
                width: fit-content;
                margin: 0;
            }

            /* ------- CONTROLS ------- */
            header .controls {
                padding: 0 8px;
                cursor: default;
                position: absolute;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 30px;
                width: 55px;
            }

            header .controls button {
                height: 15px;
                width: 15px;
                border: none;
                border-radius: 50%;
                margin: 0;
                padding: 0;
            }

            header .close {
                background-color: var(--control-close);
            }

            header .minimize {
                background-color: var(--control-minimize);
            }

            header .maximize {
                background-color: var(--control-maximize);
            }

            header .close:hover {
                background-color: var(--control-hover-close);
            }

            header .minimize:hover {
                background-color: var(--control-hover-minimize);
            }

            header .maximize:hover {
                background-color: var(--control-hover-maximize);
            }



            /* ------- MAIN ------- */
            main {
                flex: 1;
                overflow: hidden;
                background-color: var(--body-bg-color);
            }



            /* ------- WINDOW OPTIONS ------- */

            /* FULLSCREEN */
            :host(.fullscreen) {
                top: 0px !important;
                left: 0px !important;
                width: 100% !important;
                height: calc(100vh - var(--taskbar-height)) !important;
                border-radius: 0;
                z-index: 3900;
            }

            :host(.fullscreen) > header {
                border-radius: 0;
            }

            /* DRAGGING */
            :host(.dragging) {
                z-index: 4000;
            }

            /* disable pointer events when dragging to avoid any interaction with iframe & etc */
            :host(.dragging) > main {
                pointer-events: none;
            }
        `;
    }

    template() {
        return `
            <header title="${this.name}">
                <section class="controls">
                    <button title="minimize" class="minimize"></button>
                    <button title="maximize" class="maximize"></button>
                    <button title="close" class="close"></button>                    
                </section>
                <h3 class="title">${this.name}</h3>
            </header>
            <main>
                <slot></slot>
            </main>
        `;
    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
        
        this.shadowRoot.querySelector(".close").addEventListener("click", this.close);
        this.shadowRoot.querySelector(".maximize").addEventListener("click", this.fullscreen);

        handleWindowDrag(this);
    }


    /* ATTRIBUTES */
    get name() {
        return this.getAttribute('name') ?? 'Window';
    }
    set name(value) {
        this.setAttribute('name', value);
    }

    get window_fullscreen() {
        return this.classList.contains('fullscreen');
    }
    set window_fullscreen(value) {
        console.debug('setting fullscreen:', value);
        if (value) {
            this.classList.add('fullscreen');
        } else {
            this.classList.remove('fullscreen');
        }
    }

    get zIndex() {
        return this.style.zIndex;
    }
    set zIndex(value) {
        this.style.zIndex = value;
    }



    /* METHODS */
    close = () => {
        this.remove();
    };

    fullscreen = () => {
        this.classList.toggle("fullscreen");
    };
}

customElements.define('app-window', AppWindow);



// WINDOW OVERLAP
let zIndexCounter = 1;

// Resets the z-index of app windows based on their current order.
function resetZIndex() {
    console.debug('resetting z-index');

    const elements = document.querySelectorAll('app-window');
    zIndexCounter = 0;

    let elementsDict = {};
    elements.forEach(item => {
        elementsDict[item.style.zIndex] = item;
    });

    const sortedElements = Object.entries(elementsDict)
        .sort((a, b) => b[0] - a[0])
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});


    for (const [key, value] of Object.entries(sortedElements)) {
        value.style.zIndex = zIndexCounter++;
    }
}


// DRAGGING WINDOWS (MOUSE) / (TOUCH)
function handleWindowDrag(windowElement) {
    const desktop = document.querySelector("#desktop");
    const windowHead = windowElement.shadowRoot.querySelector('header');
    const windowControls = windowElement.shadowRoot.querySelector('.controls');

    windowHead.addEventListener('mousedown', startDragging, { passive: true });
    windowHead.addEventListener('touchstart', startDragging, { passive: true });

    function startDragging(e) {
        if(e.type === 'mousedown' && e.button !== 0) return;  // only allow primary mouse button (0) to drag the window

        // don't drag the window if the user clicks on the controls (close, minimize, maximize)
        if (e.target == windowControls || windowControls.contains(e.target)) {
            return;
        }

        // add dragging class to the window
        windowElement.classList.add('dragging');
        document.body.classList.add('window-dragging');

        // Calculate the initial offset from the top-left corner of the window
        let offsetX, offsetY;
        if (e.type === 'mousedown') {
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
        } else if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.touches[0].clientY - windowElement.getBoundingClientRect().top;
        }

        if ( windowElement.classList.contains('fullscreen') ) { 
            // ! order of these two lines is important !
            // ? we need the width of the window in non-fullscreen mode since else the windowElement.offsetWidth will be the width of the screen
            windowElement.classList.remove('fullscreen');
            offsetX = (windowElement.offsetWidth / 2);
        }

        windowElement.style.zIndex = zIndexCounter++;
        console.debug('z-index:', windowElement.style.zIndex);

        // Reset the z-index of all windows to prevent the z-index from going out of bounds
        const windows = document.querySelectorAll('app-window');
        if(zIndexCounter > (windows.length * 2)) {
            resetZIndex();
        }

        // Add a move event listener to update the window position
        function moveWindow(e) {
            let clientX, clientY;
            if (e.type === 'mousemove') {
                clientX = e.clientX;
                clientY = e.clientY;
            } else if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            // Set the window position based on the cursor position
            let x = clientX - offsetX;
            let y = clientY - offsetY;

            // don't let the window go outside the screen
            if(x < 0) x = 0;  // don't let the window go outside the left edge of the screen
            if(y < 0) y = 0;  // don't let the window go outside the top edge of the screen

            if(y > (desktop.offsetHeight - 50)) y = desktop.offsetHeight - 50;  // don't let the window go outside the bottom edge of the screen
            if(x > (desktop.offsetWidth - 100)) x = desktop.offsetWidth - 100;  // don't let the window go outside the right edge of the screen

            windowElement.style.left = x + 'px';
            windowElement.style.top = y + 'px';
        }

        // Add a stop event listener to stop tracking cursor movement
        function stopMoving() {
            windowElement.classList.remove('dragging');
            document.body.classList.remove('window-dragging');

            // Remove the event listeners when the mouse button is released
            document.removeEventListener('mousemove', moveWindow);
            document.removeEventListener('mouseup', stopMoving);
            document.removeEventListener('touchmove', moveWindow);
            document.removeEventListener('touchend', stopMoving);
        }

        // Attach the event listeners
        document.addEventListener('mousemove', moveWindow, { passive: true });
        document.addEventListener('mouseup', stopMoving, { passive: true });
        document.addEventListener('touchmove', moveWindow, { passive: true });
        document.addEventListener('touchend', stopMoving, { passive: true });
    }
}