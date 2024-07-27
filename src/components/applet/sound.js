class SoundApplet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.title = 'Sound';
        this.volume = 40;  // 0 - 100

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    css() {
        return `
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
            }

            svg {
                height: 80%;
                fill: white;
            }
        `;
    }

    template() {
        console.log(this.volume);

        return `
            <svg viewBox="0 0 150 128" xmlns="http://www.w3.org/2000/svg" fill="white">
                <style>
                    ${ this.volume === 0 ? '' : '.mute { display: none; }'}
                    ${ this.volume > 0 ? '' : '.wave-1 { display: none; }' }
                    ${ this.volume > 33 ? '' : '.wave-2 { display: none; }' }
                    ${ this.volume > 66 ? '' : '.wave-3 { display: none; }' }
                </style>
                <g>
                    <!-- MAGNET --><path d="M 31.3 82.4 L 13.8 82.4 C 12.7 82.4 11.8 81.5 11.8 80.4 L 11.8 47.4 C 11.8 46.3 12.7 45.4 13.8 45.4 L 31.3 45.4 L 31.3 82.4 Z" />
                    <!-- DIAPHRAGM --><path d="M 72.1 19.2 L 34.7 45.5 L 34.7 82.4 L 72.1 108.8 L 72.1 19.2 L 72.1 19.2 Z" />
                    <!-- MUTE --><g class="mute" transform="matrix(5.223598, 0, 0, 5.223598, 58.681615, 19.194252)"><path d="m4.12 6.137 1.521-1.52 7 7-1.52 1.52z"/><path d="m4.12 11.61 7.001-7 1.52 1.52-7 7z"/></g>
                    <!-- WAVES -->
                    <path class="wave-1" d="M 81.3 60.3 C 84.7 63.4 84.7 68.5 81.3 71.6 L 86.6 76.4 C 92.9 70.6 92.9 61.2 86.6 55.4 L 81.3 60.3 Z" />
                    <path class="wave-2" d="M 98.9 44.1 C 112 56.1 112 75.7 98.9 87.7 L 104.2 92.5 C 120.2 77.8 120.2 53.9 104.2 39.2 L 98.9 44.1 L 98.9 44.1 Z" />
                    <path class="wave-3" d="M 116.5 27.9 C 139.3 48.8 139.3 83.1 116.5 104 L 121.8 108.8 C 147.5 82.1 147.5 49.8 121.8 23.1 L 116.5 27.9 Z" />
                </g>
            </svg>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css()}</style>
            ${this.template()}
        `;

        this.title = `Speakers (RTalk(L) Audio): ${this.volume}%`;
    }


    get volume() {
        let volume;
        volume = this.getAttribute('volume') || 0;
        volume = parseInt(volume);
        if (volume < 0) { 
            console.warn(`[setSpeakerVolume] the volume is smaller than 0: ${volume}\nthe volume should be between 0 and 100 (inclusive)`);
            volume = 0;
        }

        if (volume > 100) {
            console.warn(`[setSpeakerVolume] the volume is greater than 100: ${volume}\nthe volume should be between 0 and 100 (inclusive)`);
            volume = 100;
        }
        return volume;
    }
    set volume(value) {
        this.setAttribute('volume', value);
    }


    static get observedAttributes() {
        return ['volume'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
}

customElements.define('applet-sound', SoundApplet);


/*

<div class="speaker applet" title="">
<!-- if the number of src-n values are changed, the `speaker-levels` attribute must be changed
        each src-n value is a different volume level -> currently 3 levels
    -->
</div>

*/
