/**
 * Frogfrogfrog
 * Ima Williams
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

//The sky
let sky = {
    r: 135,
    g: 206,
    b: 235,
}

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150,
        fill: {
            r: 0,
            g: 255,
            b: 0,
        }
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

//Second insect. The infamous bumblebee

const bumblebee = {
    x: 240,
    y: 200,
    size: 30,
    speed: 20
}


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();


    //rest the positon of the bumblebee at a random position
    resetBumblebee();

}

function draw() {
    background(sky.r, sky.g, sky.b);
    //sky.r = sky.r - 0.1
    //sky.g = sky.g - 0.1
    //sky.b = sky.b - 0.08
    moveFly();
    drawFly();
    drawBumblebee();
    moveBumblebee();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkTongueBumblebeeOverlap()
    bumblebeeFlyOverlap();
}

/*function background(sky.r, sky.g, sky.b) {
    sky.r = sky.r - 0.5
    sky.g = sky.g - 0.5
    sky.b = sky.b - 0.5
    


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

//Draw Bumblebee
function drawBumblebee() {
    push()
    noStroke();
    fill("#fff563ff");
    ellipse(bumblebee.x, bumblebee.y, bumblebee.size);
    pop();
}

//The bumblebee will be buzzing and moving at random
function moveBumblebee() {
    bumblebee.x += random(-bumblebee.speed, bumblebee.speed);
    if (bumblebee.x > 480 || bumblebee.x < 0) {
        resetBumblebee();

    }


    bumblebee.y += random(-bumblebee.speed, bumblebee.speed);
    if (bumblebee.y > height || bumblebee.y < 0) {
        resetBumblebee();

    }


}

//Reset bumblebee randomly when it reaches the maximums of the canvas
function resetBumblebee() {
    bumblebee.x = random(50, 600)
    bumblebee.y = random(200, 400)


}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
/*function moveTongue() {
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
}*/

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
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //change the color of the frog
        frog.body.fill.g += 100
    }
}

/**
 *  Tongue overlapping the bumblebee
 */
function checkTongueBumblebeeOverlap() {
    // Get distance from tongue to bumblebee
    const d = dist(frog.tongue.x, frog.tongue.y, bumblebee.x, bumblebee.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + bumblebee.size / 2);
    if (eaten) {
        // Reset the fly
        resetBumblebee();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //Change the color of the frog
        frog.body.fill.g -= 100
    }
}

/**
 * Function for the bumblebee overlapping the fly
 */

function bumblebeeFlyOverlap() {
    //Get the distance from bumblebee to gly
    const d = dist(fly.x, fly.y, bumblebee.x, bumblebee.y);
    //check overlap
    const overlap = (d < fly.size / 2 + bumblebee.size / 2)
    if (overlap) {
        // Reset fly (Flies are the prey. When bumblebee overlaps, they get eaten)
        resetFly();
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


//Handles moving the tongue based on its state

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