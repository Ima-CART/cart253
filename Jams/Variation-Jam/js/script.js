/**
 * Frogfrogfrog
 * Ima Williams
 * 
 * The original frogfrogfrog game but with different variations
 * 
 * 
 * Prof. Pippin Baar's Frogfrogfrog base game
 * Just a variation
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let state = "menu";

/**
 * Create Canvas with background
 */

function setup() {
    createCanvas(640, 480);
}

function draw() {

    switch (state) {

        case "menu":
            menuDraw();
            break;

        case "hyperSpeed":
            hyperSpeedDraw();
            break;

        case "patienceisKey":
            patienceisKeyDraw();
            break;

        case "twoHeadisBetterThanOne":
            twoHeadisBetterThanOneDraw();
            break;
    }


}
/**
 * Launch the tongue on click (if it's not launched yet)
 */
function keyPressed(event) {


    if (event.keyCode === 27) {
        window.location.reload();
    }

    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
    }
    // switch (state) {
    //     case "menu":
    //         menuKeyPressed(event);
    //         break;

    //     case "hyperSpeed":
    //         hyperKeyPressed(event);
    //         break

    //     case "patienceisKey":
    //         patienceKeyPressed(event);
    //         break;

    //     case "twoHeadisBetterThanOne":
    //         twoHeadKeyPressed(event);
    //         break;

    // }

    if (key === "m" || key === "M") {
        gameState = "menu";
    }

}