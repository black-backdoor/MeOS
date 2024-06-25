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

    const speakerImg = document.querySelector("#taskbar > .menu > .speaker img");
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
   
    var level = Math.ceil(volume * speakerLevels);

    if (volume == 0) {
        speakerImg.src = speakerImg.getAttribute("src-no");
    }
    
    else {
        speakerImg.src = speakerImg.getAttribute(`src-${level}`);
    }
    

    const speakerHolder = document.querySelector("#taskbar > .menu > .speaker");
    let percentage = volume * 100;

    speakerHolder.title = `Speakers (RTalk(L) Audio): ${percentage}%`
}