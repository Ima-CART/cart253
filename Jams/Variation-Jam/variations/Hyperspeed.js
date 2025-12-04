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

//Game State
let gameState = "play"

//Arrays for many flies
let flies = []
let silverFlies = []
let jarFlies = []

//for score
let score = 0
let angle
let dialogue = ""
let dialogueTimer = 0



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
        speed: 30,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

const goldenFly = {
    x: 0,
    y: (100, 200),//will be random
    size: 50,//8,
    speed: 2,//(100, 180),
    fill: "#ffe760ff"


}

const jar = {
    x: 550,
    y: 20,
    width: 70,
    height: 90


}




/**
 * Creates the canvas and initializes the fly
*/
function setup() {

    createCanvas(640, 480);

    resetGoldenFly();

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


    function createSilverFly() {
        const newSilverFlies = {
            x: 0,
            y: random(50, 250),
            size: 12,
            speed: random(5, 15),
            fill: "#d6d4d4ff"
        };
        return newSilverFlies;
    }

    for (let i = 0; i < 3; i++) flies.push(createFly());
    for (let i = 0; i < 2; i++) silverFlies.push(createSilverFly());
}


function draw() {
    background("#87ceeb");

    //Win Screen

    if (gameState === "win") {
        drawWinSpeech();
        return;
    }

    /**
     * Applies the array to functions that involves the fly
     */
    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkTongueFlyOverlap(fly);
    }

    //the silver flies will have the same function as regular flies
    for (let silverfly of silverFlies) {
        moveFly(silverfly);
        drawSilverFly(silverfly);
        checkTongueFlyOverlap(silverfly);


    }

    moveGoldenFly();
    drawGoldenFly();
    tongueGoldenFlyOverlap();
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
 * Draw the silver fly as a grey circle
 * 
 */

function drawSilverFly(silverfly) {
    push();
    noStroke();
    fill(silverfly.fill);
    ellipse(silverfly.x, silverfly.y, silverfly.size);
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
 * Golden fly moves at hyper speed
 */
function moveGoldenFly() {
    goldenFly.x += goldenFly.speed
    if (goldenFly.x > width) {
        resetGoldenFly();
    }

}

/**
 * Draw golden Fly
 */
function drawGoldenFly() {
    push();
    noStroke();
    fill(goldenFly.fill);
    ellipse(goldenFly.x, goldenFly.y, goldenFly.size);
    pop();

}

function resetGoldenFly() {
    goldenFly.x = 0
    goldenFly.y = random(0, 250)

}


function tongueGoldenFlyOverlap() {
    const d = dist(frog.tongue.x, frog.tongue.y, goldenFly.x, goldenFly.y);

    if (d < frog.tongue.size / 2 + goldenFly.size / 2) {
        gameState = "win";
    }

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
        //score increases
        score++
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

    if (gameState === "win" && key === "r") {
        restartGame();
    }

}

/**
 * Restarting the game
 */
function restartGame() {
    gameState = "play";
    score = 0;
    jarFlies = [];
    frog.tongue.state = "idle";
    frog.tongue.y = 480;

    flies = [];
    silverFlies = [];

    for (let i = 0; i < 3; i++)
        flies.push({ x: 0, y: random(100, 200), size: 10, speed: random(10, 30), fill: "#000" });

    for (let i = 0; i < 2; i++)
        silverFlies.push({ x: 0, y: random(100, 200), size: 12, speed: random(15, 35), fill: "#c0c0c0" });

    resetGoldenFly();


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
                vx: random(4, 8),//horizontal speed
                vy: random(4, 8),//vertical speed
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


function drawWinSpeech() {
    push();
    textAlign(CENTER);
    textSize(80);
    fill("#fff765ff");
    stroke("#ebd231ff");
    strokeWeight(4);
    text("YOU WIN!", width / 2, height / 2);


    textSize(30);
    fill("#f0ededff");
    noStroke();
    strokeWeight(2);
    text("Press R to Restart", width / 2, height / 2 + 70);
    pop();

};




/**
 * Launch the tongue on click (if it's not launched yet)
 */
// function mousePressed() {
//     if (frog.tongue.state === "idle") {
//         frog.tongue.state = "outbound";
//     }
// }