/**
 * Frogfrogfrog
 * Ima Williams
 * 
 * Variation Two heads is better than one
 * A game of catching flies with your frog-tongue and having allies assist you.
 * Get as many flies as you can before the red flies eliminates your friends
 * 
 * Instructions:
 * - Move the frog with your left and right keys
 * - Spacebar to launch the tongue
 * - Catch flies
 * - Get help from more flies
 * - Use keys to launch the tongues of your friends 
 * - Careful the redFlies attack your friends if condition is met 
 * 
 * Prof. Pippin Baar's Frogfrogfrog base game
 * Just a variation
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Arrays for flies
let flies = [];
let redFlies = [];
let jarFlies = [];
let score = 0; // the score will start off as zero 
let angle; //adding the angle for the moving of the fly
let flySpawnTimer = 0;// What the flies to spawn over time
let flySpawnInterval = 300; // flies spawn after 5 seconds'
let redFlySpawnInterval = 600; // R ed flies will spawn every 10 seconds
let bgMusic;
let audioStarted = false;
let gameOver = false;
const maxRedFlies = 5;
//Frog will be an array to allow for easy flexiblity
let frogs = []


// to track the frog appearing on the border
let newBorderFrogIndex = 0
let allBorderFrogsSpawned = false;
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

frogs.push(frog)

/**
 * I want the frogs to respawn at a specific location
 * Border frog will have a similar positioning as the original frog
 */

const borderFrogs = [
    { body: { x: 320, y: -10, size: 80 }, key: 87, dirX: 0, dirY: 1, },//Top frog. Will only appear when fly is caught  Key:[W]
    { body: { x: -10, y: 240, size: 80 }, key: 65, dirX: 1, dirY: 0, },//Left frog. Will only appear when fly is caught Key:[A]
    { body: { x: 650, y: 240, size: 80 }, key: 68, dirX: -1, dirY: 0, },//Right frog. Will only appear when fly is caught Key:[D]
    { body: { x: 10, y: 480, size: 80 }, key: 90, dirX: 1, dirY: -1 }, // Bottom-left frog. Will only appear when fly is caught Key:[Z]
    { body: { x: 630, y: 480, size: 80 }, key: 67, dirX: -1, dirY: -1 },// Bottom-right frog. Will only appear when fly is caught Key:[C]
    { body: { x: 10, y: 10, size: 80 }, key: 81, dirX: 1, dirY: 1 }, // Top-left corner frog. Will only appear when fly is caught Key: [Q]
    { body: { x: 630, y: 10, size: 80 }, key: 69, dirX: -1, dirY: 1 },// Top-right corner frog. Will only appear when fly is caught Key:[E]
];

/**
 * Capture Jar
 * Will keep track of the flies caught
 */
const jar = {
    x: 550,
    y: 20,
    width: 70,
    height: 90
};


/**
 * Creation of the fly
*/
function createFly() {

    const newFlies = {
        x: random(0, 640),
        y: random(100, 200), //Give the fly its first random position between 100 and 200
        size: 10,
        speed: random(1, 5), // I want the flies to appear slow
        fill: "#000",
        dirX: random(-1, 1),
        dirY: random(-1, 1),
        baseSpeed: undefined // Being used as reference so the fly fluctuation does not go to crazy 

    }
    return newFlies;
}

/**
 * Creation of Red Flies
 */
function createRedFly() {

    const newRedFlies = {
        x: random(0, 640),
        y: random(100, 300),
        size: 6,
        fill: "#ff0000",
        dirX: random(-1, 1),
        dirY: random(-1, 1),
        speed: random(2, 5),
        teleportTimer: 0,
        teleportInterval: int(random(180, 360)) // teleport every 3–6 seconds
    }
    return newRedFlies;
}

//Add background music
function preload() {
    bgMusic = loadSound("assets/sounds/wildlife-jungle-forest-background-music-263783.mp3")
}



/**
 * Creates the canvas and initializes the fly
 */
function setup() {

    createCanvas(640, 480);
    angleMode(DEGREES); //adding the angle for the movement of fly
    angle = 0;

    // Start of with one fly
    flies.push(createFly());

    // Start with one red fly
    redFlies.push(createRedFly());
}

function draw() {

    background("#87ceeb");

    /**
     * Game over Screen
     * You lose when all the border frogs are gone
     */
    if (gameOver) {
        background("#000033"); // dark dark blue
        fill("#ff6600"); // dark orange text
        textSize(36);
        textAlign(CENTER, CENTER);
        text("GAME OVER", width / 2, height / 2 - 40);
        textSize(28);
        text("Final Score: " + score, width / 2, height / 2 + 20);
        return;
    }

    /**
 * Spawn flies over time 
 */
    flySpawnTimer++;
    if (flySpawnTimer >= flySpawnInterval) {
        flies.push(createFly());
        flySpawnTimer = 0;
    }
    flySpawnInterval = max(20, 200 - score * 5); // faster spawns with higher score

    //Fly Funtion
    for (let fly of flies) {
        moveFly(fly);
        drawFly(fly);
        checkTongueFlyOverlap(fly);
    }

    /**
       * Red flies will spawn, but only a maximum of 5
       * Spawns at 2%. Needed more speed
      */
    while (redFlies.length < maxRedFlies && random(1) < 0.02) {
        redFlies.push(createRedFly());
    }

    // Update red flies
    for (let i = redFlies.length - 1; i >= 0; i--) {
        let rFly = redFlies[i];
        moveRedFly(rFly);
        drawRedFly(rFly);
        redFlyEffect(rFly, i);
    }

    moveFrog();
    moveTongue();
    drawFrog();
    drawCaptureJar();
}


/**
 * Moves the fly in a jittery fashion
 * Flies will stay in the canvas and respawn
 * The all have different speed
 */
function moveFly(fly) {
    if (fly.baseSpeed === undefined) fly.baseSpeed = fly.speed;

    // Randomly change direction
    if (random(1) < 0.05) {
        fly.dirX = random(-1, 1);
        fly.dirY = random(-1, 1);
    }

    // Randomly vary speed
    if (random(1) < 0.05) {
        fly.speed = fly.baseSpeed * random(0.5, 2);
    }

    // Move fly
    fly.x += fly.speed * fly.dirX;
    fly.y += fly.speed * fly.dirY;

    // Bounce off edges
    if (fly.x < 0 || fly.x > width) fly.dirX *= -1;
    if (fly.y < 0 || fly.y > height) fly.dirY *= -1;

    // Subtle buzzing effect
    fly.y += sin(angle) * 2;
    angle += 10;

    // Reset if completely off canvas
    if (fly.x < -10 || fly.x > width + 10) resetFly(fly);
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
 * Move Red Flies
 */
function moveRedFly(rFly) {

    //Teleporation
    rFly.teleportTimer++;
    if (rFly.teleportTimer >= rFly.teleportInterval) {
        rFly.x = random(0, width);
        rFly.y = random(0, height);
        rFly.teleportTimer = 0;
        rFly.teleportInterval = int(random(180, 360)); // reset random interval
    }

    //Jittery Movement
    rFly.dirX += random(-0.5, 0.5);
    rFly.dirY += random(-0.5, 0.5);
    rFly.dirX = constrain(rFly.dirX, -1, 1);
    rFly.dirY = constrain(rFly.dirY, -1, 1);

    rFly.x += rFly.speed * rFly.dirX;
    rFly.y += rFly.speed * rFly.dirY;


    //The change in direction of the flies once they meet a certain direction
    if (rFly.x < 0) { rFly.x = 0; rFly.dirX *= -1; }
    if (rFly.x > width) { rFly.x = width; rFly.dirX *= -1; }
    if (rFly.y < 0) { rFly.y = 0; rFly.dirY *= -1; }
    if (rFly.y > height) { rFly.y = height; rFly.dirY *= -1; }
}

function drawRedFly(rFly) {
    push();
    noStroke();
    fill(rFly.fill);
    ellipse(rFly.x, rFly.y, rFly.size);
    pop();
}

/**
 * The effect of the redfly once all borderfrog are active
 * Red flies do nothing until border frogs are all active
 * uses the red fly and the index. idx stands for index
 */
function redFlyEffect(rFly, idx) {
    if (newBorderFrogIndex >= borderFrogs.length) allBorderFrogsSpawned = true;

    //If all the border flies are presented the red flies starts to eliminate
    if (allBorderFrogsSpawned) {
        for (let f of frogs) {
            if (!f.tongue) continue;

            //When there is an overlap of the red flies the borderfrog minues
            const d = dist(f.tongue.x, f.tongue.y, rFly.x, rFly.y);
            if (d < f.tongue.size / 2 + rFly.size / 2) {
                for (let i = frogs.length - 1; i >= 0; i--) {
                    if (frogs[i] !== frog) {
                        frogs.splice(i, 1);
                        break;
                    }
                }
                redFlies.splice(idx, 1);

                //The red flies will continue to respawn, but will be max 5 redflies
                if (redFlies.length < maxRedFlies) redFlies.push(createRedFly());

                //Lose game if all border frogs are eliminated
                if (frogs.filter(f => f !== frog).length === 0) gameOver = true;

                //Breaks the loop
                break;
            }
        }
    }
}


/**
 * Moves the frog to the with the left and right keys
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

            // Border Frogs
            else if (f !== frog) {
                // Border frog Tongues
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

        if (f.tongue.state === "inbound") {
            const d = dist(f.tongue.x, f.tongue.y, f.body.x, f.body.y);
            if (d <= f.tongue.speed || d < 1) {
                f.tongue.state = "idle";
                f.tongue.x = f.body.x;
                f.tongue.y = f.body.y;
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


            // Draw  the frog's body
            push();
            fill("#00ff00");
            noStroke();
            ellipse(f.body.x, f.body.y, f.body.size);
            pop();

            /**
             * The function provided is to allow the frog eyes to appear on all frog
             * Combined is the scaling of the main frog and the small scale of the smaller frog
             * 
             */

            let scale = f.body.size / 150;
            let eyeX = 45 * scale;
            let eyeY = 70 * scale;
            let pupilY = 73 * scale;

            let dx = f.tongue.dirX;
            let dy = f.tongue.dirY;

            function rotateOffset(x, y, dirX, dirY) {
                let a = atan2(dirY, dirX) + 90;
                let nx = x * cos(a) - y * sin(a);
                let ny = x * sin(a) + y * cos(a);
                return { x: nx, y: ny };
            }

            let left = rotateOffset(-eyeX, -eyeY, dx, dy);
            let right = rotateOffset(eyeX, -eyeY, dx, dy);
            let leftP = rotateOffset(-eyeX, -pupilY, dx, dy);
            let rightP = rotateOffset(eyeX, -pupilY, dx, dy);

            // GREEN EYELIDS
            push();
            noStroke();
            strokeWeight(0);
            fill("#00ff00");
            ellipse(f.body.x + left.x, f.body.y + left.y, f.body.size - 105 * scale);
            ellipse(f.body.x + right.x, f.body.y + right.y, f.body.size - 105 * scale);
            pop();

            // WHITE EYES
            push();
            noStroke();
            strokeWeight(0);
            fill("#fff");
            ellipse(f.body.x + left.x, f.body.y + left.y, f.body.size - 120 * scale);
            ellipse(f.body.x + right.x, f.body.y + right.y, f.body.size - 120 * scale);
            pop();

            // PUPILS
            push();
            noStroke();
            strokeWeight(0);
            fill("#000");
            ellipse(f.body.x + leftP.x, f.body.y + leftP.y, f.body.size - 130 * scale);
            ellipse(f.body.x + rightP.x, f.body.y + rightP.y, f.body.size - 130 * scale);
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

            //Only the main frog can spawn border frig
            f.tongue.state = "inbound";
            if (f === frog) spawnBorderFrog();
        }
    }
}

function spawnBorderFrog() {
    if (newBorderFrogIndex < borderFrogs.length) {
        let newFrog = borderFrogs[newBorderFrogIndex];

        //Array to create the border frogs
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


/**
 * Draw the Capture Jar
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
 * The border frog has their own respective keys
 */

function keyPressed() {
    // Start audio on first key press
    if (!audioStarted) {
        userStartAudio();
        bgMusic.loop();
        bgMusic.setVolume(0.2);
        bgMusic.rate(1);
        audioStarted = true;
    }
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

