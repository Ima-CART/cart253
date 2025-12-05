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

//Frog will be an array to allow for easy flexiblity
let frogs = []

// to track the frog appearing on the border
let newBorderFrogIndex = 0

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
        state: "idle", // State can be: idle, outbound, inbound
        dirX: 0,
        dirY: -1,

    }
};

frogs.push(frog)

/**
 * I want the frogs to respawn at a specific location
 * Border frog will have a similar positioning as the original frog
 */

const borderFrogs = [
    { body: { x: 320, y: -10, size: 80 }, key: 87, dirX: 0, dirY: 1, },//Top frog. Will only appear when fly is caught
    { body: { x: -10, y: 240, size: 80 }, key: 65, dirX: 1, dirY: 0, },//Left frog. Will only appear when fly is caught
    { body: { x: 650, y: 240, size: 80 }, key: 68, dirX: -1, dirY: 0, },//Right frog. Will only appear when fly is caught
    { body: { x: -10, y: 460, size: 80 }, key: 81, dirX: 1, dirY: -1 }, // Bottom-left frog. Will only appear when fly is caught
    { body: { x: 650, y: 460, size: 80 }, key: 69, dirX: -1, dirY: -1 },// Bottom-right frog. Will only appear when fly is caught
    { body: { x: -10, y: -10, size: 80 }, key: 90, dirX: 1, dirY: 0 }, // Top-left corner frog. Will only appear when fly is caught
    { body: { x: 650, y: -10, size: 80 }, key: 88, dirX: -1, dirY: 0 },// Top-right corner frog. Will only appear when fly is caught
];

/**
 * Our Fly
 * Has a position, size, and speed of horizontal movement
 */
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};


/**
 * Capture Jar
 * Will keep track of the flies caught
 */


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES); //adding the angle for the movement of fly
    angle = 0;


    /**
     * Creation of the fly
     */
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

    // The amount of flies in the array
    for (let i = 0; i < 1; i++) flies.push(createFly());
}

function draw() {
    background("#87ceeb");


    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkTongueFlyOverlap(fly);
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
    for (let f of frogs) {
        if (!f.tongue) continue;

        // If the tongue is idle, it doesn't do anything
        if (f.tongue.state === "idle") {
            f.tongue.x = f.body.x;
            f.tongue.y = f.body.y;
        }

        // If the tongue is outbound, it moves up
        else if (f.tongue.state === "outbound") {
            f.tongue.x += f.tongue.speed * f.tongue.dirX;
            f.tongue.y += f.tongue.speed * f.tongue.dirY;
        }

        // The tongue bounces back if it hits the top
        else if (f.tongue.state === "inbound") {
            f.tongue.x -= f.tongue.speed * f.tongue.dirX;
            f.tongue.y -= f.tongue.speed * f.tongue.dirY;
        }

        // Check bounds for inbound/outbound
        if (f.tongue.state === "outbound") {
            if (f === frog && f.tongue.y <= 0) f.tongue.state = "inbound";

            // main frog
            else if (f !== frog) {
                // Border frog bounds
                if (f.tongue.dirY === 1 && f.tongue.y >= height) f.tongue.state = "inbound"; // top frog
                if (f.tongue.dirX === 1 && f.tongue.x >= width) f.tongue.state = "inbound"; // left frog
                if (f.tongue.dirX === -1 && f.tongue.x <= 0) f.tongue.state = "inbound"; // right frog
            }
        }

        if (f.tongue.state === "inbound") {
            if ((f === frog && f.tongue.y >= height) ||
                (f !== frog && dist(f.tongue.x, f.tongue.y, f.body.x, f.body.y) < f.tongue.speed)) {
                f.tongue.state = "idle";



            }
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {

    for (let f of frogs) {

        if (f.tongue) {
            // Draw the tongue tip
            push();
            fill("#ff0000");
            noStroke();
            ellipse(f.tongue.x, f.tongue.y, f.tongue.size);
            pop();

            // Draw the rest of the tongue
            push();
            stroke("#ff0000");
            strokeWeight(f.tongue.size);
            line(f.tongue.x, f.tongue.y, f.body.x, f.body.y);
            pop();


            // Draw the frog's body
            push();
            fill("#00ff00");
            noStroke();
            ellipse(f.body.x, f.body.y, f.body.size);
            pop();
        }
    }
}
/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(fly) {
    for (let f of frogs) {
        if (!f.tongue) continue;
        // Get distance from tongue to fly
        const d = dist(f.tongue.x, f.tongue.y, fly.x, fly.y);
        // Check if it's an overlap
        const eaten = (d < f.tongue.size / 2 + fly.size / 2);
        if (eaten) {
            // Reset the fly
            resetFly(fly);
            // Score increases
            score++

            f.tongue.state = "inbound";
            if (f === frog) spawnBorderFrog();
        }
    }
}

function spawnBorderFrog() {
    if (newBorderFrogIndex < borderFrogs.length) {
        let newFrog = borderFrogs[newBorderFrogIndex];

        frogs.push({
            body: { ...newFrog.body },
            key: newFrog.key,
            tongue: {
                x: newFrog.body.x,
                y: newFrog.body.y,
                size: 15,
                speed: 15,
                dirX: newFrog.dirX,
                dirY: newFrog.dirY,
                state: "idle",

            }
        })
        newBorderFrogIndex++;
    }
}



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
                vx: random(-2, 2),//horizontal speed
                vy: random(-2, 2),//vertical speed
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
    if (keyCode === 32 && frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }

    // Border frog tongues
    for (let f of frogs) {
        if (f !== frog && keyCode === f.key && f.tongue.state === "idle") {
            f.tongue.state = "outbound";
        }

    }

}

