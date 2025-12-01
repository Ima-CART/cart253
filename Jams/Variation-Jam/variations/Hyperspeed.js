/**
 * Frogfrogfrog
 * Ima Williams
 * 
 * The variation is called hyperspeed. It's a chaotic version where everything is extremely fast and
 * there is no way to control the tongue and know if you caught a fly.
 * 
 * Instructions:
 * - Move the frog with the left and right keys
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//Arrays for many flies
let flies = []


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
        speed: 100,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};


/**
 * Creates the canvas and initializes the fly
*/
function setup() {
    createCanvas(640, 480);

    // Our fly
    // Has a position, size, and speed of horizontal movement
    function createFly() {

        const newFlies = {
            x: 0,
            y: random(100, 200), // Will be random
            size: 10,
            speed: random(10, 30),
            fill: "#000"
        };

        return newFlies;
    }
    flies.push(createFly())
    flies.push(createFly())
    flies.push(createFly())
}

function draw() {
    background("#87ceeb");

    /**
     * Applies the array to functions that involves the fly
     */
    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkTongueFlyOverlap(fly);
    }

    moveFrog();
    moveTongue();
    drawFrog();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    fly.x += fly.speed;
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
 * Reset the fly when it reaches width
 */
function resetFly(fly) {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    //frog.body.x = mouseX;
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
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}