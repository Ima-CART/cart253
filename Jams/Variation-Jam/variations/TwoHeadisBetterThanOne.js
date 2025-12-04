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
let bgMusic;


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
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};


// Capture Jar

const jar = {
    x: 550,
    y: 20,
    width: 70,
    height: 90


}

//Add a calming song to the game
// function preload() {
//     bgMusic = loadSound("assets/sounds/reflected-light-147979.mp3")
// }


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES); //adding the angle for the movement of fly
    angle = 0;
    // bgMusic.loop();

    // bgMusic.setVolume(0.2);
    // bgMusic.rate(1);


    function createFly() {

        const newFlies = {
            x: 0,
            y: random(100, 200), //Give the fly its first random position between 100 and 200
            size: 10,
            speed: random(1, 5), // I want the flies to appear slow
            fill: "#000"

        }
        return newFlies;
    }

    // the creation of flies in the array 
    for (let i = 0; i < 1; i++) flies.push(createFly());
}

function draw() {
    background("#87ceeb");

    // if (dialogueTimer > 0) {
    //     dialogueTimer--;
    // } else if (dialogueTimer === 0) {
    //     dialogue = "";
    // }


    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkTongueFlyOverlap(fly);
        // repelFly(fly);

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
    let buzzingY = sin(angle) * 5
    fly.y = constrain(fly.y - buzzingY, 0, 460);
    angle += 10
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
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";


        }
    }
}

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

        frog.tongue.state = "inbound";
    }
}


/**
 * Repels flies when near tongue
 */
// function repelFly(fly) {
//     const r = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
//     const repel = (r < 20);
//     if (repel) {
//         fly.y -= 5
//         fly.x += 2
//     }

// }

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
 * Tongue will be launched with the spacebar 
 */

function keyPressed() {
    if (keyCode === 32) {
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";




        }

    }

}
