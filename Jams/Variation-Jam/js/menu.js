/**
 * This file contains the menu for the frogfrogfrog game variation jam
 *
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 *
 */


/**
 * The constant for the menu text
 */
const menuText = `
(H) HyperSpeed 
(P) PatienceisKey
(T) TwoHeadisBetterthanOne`

const titleText =
    `Adventurous Frog `

const instructionText = `
-Use the the left and right keys to move
-The Spacebar to launch the tongue
-Extra keys for allies in Two heads
-Experience different version
    `

/**
 * Display the menu
 */
function menuDraw() {
    background("#87ceeb");
    push();
    fill("#f9f9f9ff");
    textSize(30);
    textAlign(CENTER, BASELINE);
    text(menuText, width / 2, height - 150);
    pop();

    menuDrawTitle();
    menuDrawInstruction();

}

function menuDrawTitle() {
    push();
    fill("#000");
    textSize(48);
    textAlign(CENTER, CENTER);
    text(titleText, width / 2, 70);
    pop();
}


function menuDrawInstruction() {

    push();
    fill("#033909ff");
    textSize(24);
    textAlign(CENTER, CENTER);
    text(instructionText, width / 2, 220);
    pop();

}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 72:
            state = "hyperSpeed";
            hyperSpeedSetup();
            break;

        case 80:
            state = "patienceiskey";
            patienceisKeySetup();
            break;

        case 84:
            state = "twoHeadisBetterThanOne";
            twoHeadisBetterThanOneSetup();
            break;
    }
}




