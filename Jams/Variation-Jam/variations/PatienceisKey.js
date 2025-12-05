/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Arrays for flies
let flies = []
let jarFlies = []
let score = 0 // the score will start off as zero 
let angle; //adding the angle for the moving of the fly
let dialogue = "";// adding dialogue to the game
let dialogueTimer = 0; // timer for showing dialogue
let consecutiveCatches = 0;//variable for flies that are caught in succession
let gameOver = false;  // Flag to track game over state
let gameWon = false;   // Flag to track game win state

let bgMusic;

// adding a fun element a floating interactive text
let floatingText = null
let floatingTextTimer = 0;

// Our frog
const frog = {
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
        speed: 5,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};


// Capture Jar

const jar = {
    x: 550,
    y: 20,
    width: 70,
    height: 90


}

//Add a calming song to the game
function preload() {
    bgMusic = loadSound("assets/sounds/reflected-light-147979.mp3")
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES); //adding the angle for the movement of fly
    angle = 0;
    bgMusic.loop();

    bgMusic.setVolume(0.2);
    bgMusic.rate(1);

    /**
     * Creation of the fly in the array
     *
     */
    function createFly() {

        const newFlies = {
            x: 0,
            y: random(100, 200), //Give the fly its first random position between 100 and 200
            size: 10,
            speed: random(.1, .5), // I want the flies to appear slow
            fill: "#000"

        }
        return newFlies;
    }

    // Set to have 15 flies
    for (let i = 0; i < 20; i++) flies.push(createFly());

}

function draw() {
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

    if (floatingText) {
        drawFloatingText(floatingText);
        repelFloatingText(floatingText); //FloatingText will repel if tongue gets close

        //When the timer runs out, remove the floatingtext
        floatingTextTimer--;
        if (floatingTextTimer <= 0) {
            floatingText = null;//Remove floating text after 10 seconds
        }

    }

    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkTongueFlyOverlap(fly);
        repelFly(fly);

    }
    moveFrog();
    moveTongue();
    drawFrog();
    drawCaptureJar();
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
function moveFrog() {
    if (keyIsDown(LEFT_ARROW)) {
        frog.body.x = constrain(frog.body.x - frog.tongue.speed, 10, 630)
    }

    else if (keyIsDown(RIGHT_ARROW)) {
        frog.body.x = constrain(frog.body.x + frog.tongue.speed, 10, 630)
    }
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
            consecutiveCatches = 0;
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
            consecutiveCatches = 0;
            //     dialogue = " I am so hungry";

        }
    }
}

// function moveTongue() {
//     frog.tongue.x = frog.body.x;
//     //If the tongue is outbound, it moves up
//     if (frog.tongue.state === "outbound") {
//         frog.tongue.y -= frog.tongue.speed;

//         // Switch to inbound when reaching top
//         if (frog.tongue.y <= 0) {
//             frog.tongue.state = "inbound";
//             consecutiveCatches = 0; // reset streak
//         }
//         //If the tongue is inbound, it moves down
//     } else if (frog.tongue.state === "inbound") {
//         frog.tongue.y += frog.tongue.speed;

//         // The tongue stops if it hits the bottom
//         if (frog.tongue.y >= height) {
//             frog.tongue.state = "idle"; //Do nothing
//             consecutiveCatches = 0; // reset streak
//         }
//     }
// }

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(fly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly(fly);
        // Score increases
        score++
        //Consecutive catches increase
        consecutiveCatches++

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
            floatingTextTimer = 600; //Floating text will only appear for 10 seconds
        }

        else if (consecutiveCatches === 10) {
            dialogue = " That's it you did it. I am full";
            dialogueTimer = 180;
        }

        else {
            dialogue = ""
        }
        // frog.tongue.state = "inbound";
    }
}

/**
 * Repels flies when near tongue
 */
function repelFly(fly) {
    const r = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    const repel = (r < 20);
    if (repel) {
        fly.y -= 5
        fly.x += 2
    }

}

/**
 * Draws the capture jar and the flies inside
 */

function drawCaptureJar() {
    push();
    fill("#ffffff62")
    noStroke();
    rect(jar.x, jar.y, jar.width, jar.height, 10) //The outline of the jar

    fill("#000");
    textSize(18);
    textAlign(CENTER);
    text(score, 585, 130)



    for (let i = 0; i < score; i++) {

        //For smoother transition of the game and to have the function follow everything
        if (!jarFlies[i]) {

            //adding the jarFlies variable in the capture jar function
            jarFlies[i] = {

                x: random(jar.x + 10, jar.x + jar.width - 10),
                y: random(jar.y + 10, jar.y + jar.height - 10),

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
                    if (this.x < jar.x + this.size / 2 || this.x > jar.x + jar.width - this.size / 2) {
                        this.vx *= -1;  // Reverse direction horizontally
                    }
                    if (this.y < jar.y + this.size / 2 || this.y > jar.y + jar.height - this.size / 2) {
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
        jarFlies[i].move();
        jarFlies[i].display();

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
    const d = dist(frog.tongue.x, frog.tongue.y, floatingText.x, floatingText.y);
    const repelF = (d < 50)
    if (repelF) {
        // Change text content to focus on the game
        floatingText.text = "Focus! Flies are your targets!";
        floatingText.fill = "#ff0000"; // Change text color to indicate focus

        // Repel the floating text away from the tongue
        const angle = atan2(floatingText.y - frog.tongue.y, floatingText.x - frog.tongue.x);
        floatingText.x += cos(angle) * 5; // Push text away along the angle
        floatingText.y += sin(angle) * 5;
    }


}


/**
 * Tongue will be launched with the spacebar 
 */

function keyPressed() {
    if (keyCode === 32) {
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";




        }

    }

}

/**
 * Launch the tongue on click (if it's not lauxnched yet)
 */
// function mousePressed() {
//     if (frog.tongue.state === "idle") {
//         frog.tongue.state = "outbound";
//     }
// 