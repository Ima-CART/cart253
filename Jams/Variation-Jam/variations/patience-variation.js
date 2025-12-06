/**
 * Frogfrogfrog
 * Ima Williams
 * 
 * Variation Patience is Key
 * You need patience to play this game.
 * A slow game where you need to catch 3 flies in a row to stay alive
 * You get more surprise depending on your streak. 
 * Keep the frog fed
 * 
 * Instructions:
 * - Move the frog with your left and right keys
 * - Spacebar to launch the tongue
 * - Catch flies
 * - Catching consecutive flies is key
 * 
 * Prof. Pippin Baar's Frogfrogfrog base game
 * Just a variation
 * Made with p5
 * https://p5js.org/
 */
"use strict";

// Arrays for flies
let flies = []
let patienceJarFlies = []
let score = 0 // the score will start off as zero 
let angle; //adding the angle for the moving of the fly
let dialogue = "";// adding dialogue to the game
let dialogueTimer = 0; // timer for showing dialogue
let consecutiveCatches = 0;//variable for flies that are caught in succession
let gameOver = false;  // Flag to track game over state
let gameWon = false;   // Flag to track game win state
let patienceAudioStarted = false;// audio will play when key is pressed
let patienceBgMusic;

// adding a fun element a floating interactive text
let floatingText = null
let floatingTextTimer = 0;

// Our frog
const patienceFrog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: .5,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

    //The frog's eyes
    //the white part of the eye
    eyelid: {
        x: 270,
        y: 440,
        size: 45,
        fill: "#00ff00"
    },


    //The frog's eyes
    //the white part of the eye
    eye: {
        x: 270,
        y: 440,
        size: 30,
        fill: "#fff"
    },

    //The pupil
    pupil: {
        x: 270,
        y: 440,
        size: 20,
        fill: "#000",



    },
};


// Capture Jar

const patienceJar = {
    x: 550,
    y: 20,
    width: 70,
    height: 90


}

//Add a calming song to the game
function preload() {
    patienceBgMusic = loadSound("assets/sounds/reflected-light-147979.mp3")
}

/**
 * Creation of the fly in the array
 *
 */
function createFly() {

    const newFlies = {
        x: 0,
        y: random(50, 300), //Give the fly its first random position between 100 and 200
        size: 10,
        speed: random(.1, .5), // I want the flies to appear slow
        fill: "#000"

    }
    return newFlies;
}

/**
 * Creates the canvas and initializes the fly
 */
function patienceSetup() {
    createCanvas(640, 480);
    angleMode(DEGREES); //adding the angle for the movement of fly
    angle = 0;


    // Set to have 3 0 flies
    for (let i = 0; i < 30; i++) flies.push(createFly());

}

function patienceDraw() {
    background("#87ceeb");

    //Game Over Screen
    if (gameOver) {
        // Show Game Over screen
        background("#ff0000");  // Game Over background color
        fill("#ffffff");
        textSize(40);
        textAlign(CENTER);
        text("Game Over!", width / 2, height / 2);
        textSize(20);
        text("Press 'R' to Restart", width / 2, height / 2 + 50);
        return;  // Stop further drawing
    }

    // Winning Game Screen 
    if (gameWon) {
        // Show Win screen
        background("#32CD32");  // Win background color
        fill("#ffffff");
        textSize(40);
        textAlign(CENTER);
        text("You Win!", width / 2, height / 2);
        textSize(20);
        text("Press 'R' to Restart", width / 2, height / 2 + 50);
        return;  // Stop further drawing
    }


    //Addition of Dialogue
    if (dialogueTimer > 0) {
        dialogueTimer--;
    } else if (dialogueTimer === 0) {
        dialogue = "";
    }

    //Display dialogue
    if (dialogue !== "") {
        fill("#000");
        textSize(22);
        textAlign(CENTER);
        text(dialogue, 320, 240)

    }

    //Draw the floating text when conditions are met
    if (floatingText) {
        drawFloatingText(floatingText);
        repelFloatingText(floatingText); //FloatingText will repel if tongue gets close

        //When the timer runs out, remove the floatingtext
        floatingTextTimer--;
        if (floatingTextTimer <= 0) {
            floatingText = null;//Remove floating text after 20 seconds
        }

    }

    //Fly loop
    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkPatienceTongueFlyOverlap(fly);
        repelFly(fly);

    }
    movePatienceFrog();
    movePatienceTongue();
    drawPatienceFrog();
    drawCapturePatienceJar();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    fly.x += fly.speed;
    let buzzingY = sin(angle) * .3
    fly.y = constrain(fly.y - buzzingY, 0, 460);
    angle += .2
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly(fly);
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function movePatienceFrog() {
    if (keyIsDown(LEFT_ARROW)) {
        patienceFrog.body.x = constrain(patienceFrog.body.x - patienceFrog.tongue.speed, 10, 630)
    }

    else if (keyIsDown(RIGHT_ARROW)) {
        patienceFrog.body.x = constrain(patienceFrog.body.x + patienceFrog.tongue.speed, 10, 630)
    }
}

/**
 * Handles moving the tongue based on its state
 */
function movePatienceTongue() {
    // Tongue matches the frog's x
    patienceFrog.tongue.x = patienceFrog.body.x;

    // If the tongue is outbound, it moves up
    if (patienceFrog.tongue.state === "outbound") {
        patienceFrog.tongue.y -= patienceFrog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (patienceFrog.tongue.y <= 0) {
            patienceFrog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (patienceFrog.tongue.state === "inbound") {
        patienceFrog.tongue.y += patienceFrog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (patienceFrog.tongue.y >= height) {
            patienceFrog.tongue.state = "idle";
            // Check if game over or won after the tongue reaches idle state
            if (consecutiveCatches < 3 && !gameWon) {
                gameOver = true;  // Game over if fewer than 3 consecutive catches
            } else if (consecutiveCatches >= 10) {
                gameWon = true;  // Player wins after catching 10 flies consecutively
            }
            consecutiveCatches = 0; // Reset consecutive catches
        }
    }
}



/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawPatienceFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(patienceFrog.tongue.x, patienceFrog.tongue.y, patienceFrog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(patienceFrog.tongue.size);
    line(patienceFrog.tongue.x, patienceFrog.tongue.y, patienceFrog.body.x, patienceFrog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(patienceFrog.body.x, patienceFrog.body.y, patienceFrog.body.size);
    pop();

    //Draw the frog's green eye
    //The left eye 
    push();
    fill(patienceFrog.eyelid.fill)
    noStroke();
    ellipse(patienceFrog.body.x - 45, patienceFrog.body.y - 70, patienceFrog.body.size - 105);
    pop();
    //The right eye 
    push();
    fill(patienceFrog.eyelid.fill);
    noStroke();
    ellipse(patienceFrog.body.x + 45, patienceFrog.body.y - 70, patienceFrog.body.size - 105);
    pop();

    //Draw the frog's white part of the eye
    // //The left eye
    push();
    fill(patienceFrog.eye.fill);
    noStroke();
    ellipse(patienceFrog.body.x - 45, patienceFrog.body.y - 70, patienceFrog.body.size - 120);
    pop();

    //The right eye
    push();
    fill(patienceFrog.eye.fill);
    noStroke();
    ellipse(patienceFrog.body.x + 45, patienceFrog.body.y - 70, patienceFrog.body.size - 120);
    pop();

    //The pupil
    //The right pupil 
    push();
    fill(patienceFrog.pupil.fill);
    noStroke();
    ellipse(patienceFrog.body.x - 45, patienceFrog.body.y - 73, patienceFrog.body.size - 130);
    pop();

    //The left pupil
    push();
    fill(patienceFrog.pupil.fill);
    noStroke();
    ellipse(patienceFrog.body.x + 45, patienceFrog.body.y - 73, patienceFrog.body.size - 130);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkPatienceTongueFlyOverlap(fly) {
    // Get distance from tongue to fly
    const d = dist(patienceFrog.tongue.x, patienceFrog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < patienceFrog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly(fly);
        // Score increases
        score++
        //Consecutive catches increase
        consecutiveCatches++


        /**
         * INTRODUCING THE STREAKS
         */

        if (consecutiveCatches === 3) {
            dialogue = "Three in a row! You're moving forward";
            dialogueTimer = 120; //2 second
            //streak will reset when tongue becomes inbound/idle 
        }

        else if (consecutiveCatches === 5) {
            dialogue = "Five streak! You are nearing the goal";
            dialogueTimer = 150;

            //Reveal the floating text when 5 flies have been caught in succession
            floatingText = {
                x: width / 2,
                y: 100,
                text: "5 in a row! Keep it up",
                fill: "#f9770dff"
            }
            floatingTextTimer = 1200; //Floating text will only appear for 20 seconds
        }

        else if (consecutiveCatches === 10) {
            dialogue = " That's it you did it. I am full";
            dialogueTimer = 180;
        }

        else {
            dialogue = ""
        }
    }
}

/**
 * Repels flies when near tongue
 */
function repelFly(fly) {
    const r = dist(patienceFrog.tongue.x, patienceFrog.tongue.y, fly.x, fly.y);
    const repel = (r < 20);
    if (repel) {
        fly.y -= 5
        fly.x += 2
    }

}

/**
 * Draws the capture jar and the flies inside
 */

function drawCapturePatienceJar() {
    push();
    fill("#ffffff62")
    noStroke();
    rect(patienceJar.x, patienceJar.y, patienceJar.width, patienceJar.height, 10) //The outline of the jar

    fill("#000");
    textSize(18);
    textAlign(CENTER);
    text(score, 585, 130)



    for (let i = 0; i < score; i++) {

        //For smoother transition of the game and to have the function follow everything
        if (!patienceJarFlies[i]) {

            //adding the jarFlies variable in the capture jar function
            patienceJarFlies[i] = {

                x: random(patienceJar.x + 10, patienceJar.x + patienceJar.width - 10),
                y: random(patienceJar.y + 10, patienceJar.y + patienceJar.height - 10),

                /**Trying to slow down the speed of the flies in the jar. 
                 * Add velocity for flexibility
                 */
                vx: random(-0.05, 0.05),//horizontal speed
                vy: random(-0.05, 0.05),//vertical speed
                size: 10,

                //move of the flies in the jar. Using the methond function
                move: function () {

                    //using the word this to specify the x and velocity inside the jarFlies
                    this.x += this.vx;
                    this.y += this.vy;

                    //flies will be bouncing in the jar without leaving the jar
                    if (this.x < patienceJar.x + this.size / 2 || this.x > patienceJar.x + patienceJar.width - this.size / 2) {
                        this.vx *= -1;  // Reverse direction horizontally
                    }
                    if (this.y < patienceJar.y + this.size / 2 || this.y > patienceJar.y + patienceJar.height - this.size / 2) {
                        this.vy *= -1;  // Reverse direction vertically

                    }
                },


                //Method function in order to have the flies display in the jar
                display: function () {
                    fill("#000");
                    noStroke();
                    ellipse(this.x, this.y, this.size / 2);
                }

            };


        }


        // Move and display the fly inside the jar
        patienceJarFlies[i].move();
        patienceJarFlies[i].display();

    }
    pop();

}


/**
 * Draw floating text
 */

function drawFloatingText(floatingText) {

    // Ensure the text stays within canvas bounds (adjust if near edges)
    floatingText.x = constrain(floatingText.x, 10, 600); // Keep it within the horizontal bounds
    floatingText.y = constrain(floatingText.y, 10, 400);  // Keep it within the vertical bounds

    push();
    fill(floatingText.fill);
    textSize(20);
    textAlign(CENTER);
    text(floatingText.text, floatingText.x, floatingText.y);
    pop();



}

/**
 * Repel when tongue is near 
 */

function repelFloatingText(floatingText) {
    const d = dist(patienceFrog.tongue.x, patienceFrog.tongue.y, floatingText.x, floatingText.y);
    const repelF = (d < 50)
    if (repelF) {
        // Change text content to focus on the game
        floatingText.text = "Focus! Flies are your targets!";
        floatingText.fill = "#ff0000"; // Change text color to indicate focus

        // Repel the floating text away from the tongue
        const angle = atan2(floatingText.y - patienceFrog.tongue.y, floatingText.x - patienceFrog.tongue.x);
        floatingText.x += cos(angle) * 5; // Push text away along the angle
        floatingText.y += sin(angle) * 5;
    }


}


/**
 * Tongue will be launched with the spacebar 
 */

function patienceKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    if (!patienceAudioStarted) {
        userStartpatienceAudio();
        patienceBgMusic.loop();
        patienceBgMusic.setVolume(0.2);
        patienceBgMusic.rate(1);
        patienceAudioStarted = true;
    }
    if (keyCode === 32 && !gameOver && !gameWon) {
        if (patienceFrog.tongue.state === "idle") {
            patienceFrog.tongue.state = "outbound";

        }
    }
    // Restart the game if 'R' is pressed
    if (key === 'r' || key === 'R') {
        // Reset game state
        gameOver = false;
        gameWon = false;
        score = 0;
        consecutiveCatches = 0;
        flies = [];
        for (let i = 0; i < 15; i++) flies.push(createFly());
        // Reset tongue
        patienceFrog.tongue.y = 480;
        patienceFrog.tongue.state = "idle";

        // Reset floating text
        floatingText = null;
        floatingTextTimer = 0;

    }

}
