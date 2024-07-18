document.addEventListener("DOMContentLoaded", function() {
    setSpeakerVolume(0.5);
});




/* SPEAKER */
/*
    the speakerImg is something like this:

    ```HTML
    <img src="/icons/sound/speaker.svg"
    src-no="/icons/sound/speaker-muted.svg"
    src-1="/icons/sound/speaker-1.svg"
    src-2="/icons/sound/speaker-2.svg"
    src-3="/icons/sound/speaker-3.svg"
    speaker-levels="3">
    ```

    each src-# attribute represents a different speaker level, and the src-no attribute represents the muted speaker icon.
    in this example, the speaker has 3 levels, and the muted icon is represented by the src-no attribute.
    the speaker-levels is the number of levels the speaker has.
*/

function setSpeakerVolume (volume) {
    /*
     * Set the speaker volume on the taskbar
     * @param {number} volume - the volume level
     * @return {void}
     */

    function preloadImage(url, successCallback, errorCallback) {
        let img = new Image();
        img.onload = function() {
            successCallback();
        };
        img.onerror = function() {
            errorCallback();
        };
        img.src = url;
    }

    const speakerImg = document.querySelector("#taskbar > .applets > .speaker img");
    if(speakerImg == undefined) {
        console.warn("the speaker icon was not found");
        return;
    }

    if(volume > 1) {
        console.warn(`[setSpeakerVolume] the volume is greater than 1: ${volume}\nthe volume should be between 0 and 1 (inclusive)\n75% = 0.75`);
        volume = 1;
    }

    if(volume < 0) {
        console.warn(`[setSpeakerVolume] the volume is smaller than 0: ${volume}\nthe volume should be between 0 and 1 (inclusive)\n75% = 0.75`);
        volume = 0;
    }


    // let volume = between 0 and 1 (inclusive)
    // let speakerLevels = number of speaker levels or icons
    let speakerLevels = parseInt(speakerImg.getAttribute("speaker-levels"), 10) || 1;
   
    let level = Math.ceil(volume * speakerLevels);

    if (volume == 0) {
        const imgSrc = speakerImg.getAttribute("src-no");
        preloadImage(imgSrc, function() {
            speakerImg.src = imgSrc;
        }, function() {
            console.debug(`[setSpeakerVolume] image could not be loaded: ${imgSrc} setting src-error`);
            speakerImg.src = speakerImg.getAttribute("src-error");
        });
    }
    
    else {
        const imgSrc = speakerImg.getAttribute(`src-${level}`);
        preloadImage(imgSrc, function() {
            speakerImg.src = imgSrc;
        }, function() {
            console.debug(`[setSpeakerVolume] image could not be loaded: ${imgSrc} setting src-error`);
            speakerImg.src = speakerImg.getAttribute("src-error");
        });
    }
    

    const speakerHolder = document.querySelector("#taskbar > .applets > .speaker");
    let percentage = volume * 100;

    speakerHolder.title = `Speakers (RTalk(L) Audio): ${percentage}%`
}