/**
 * Frogfrogfrog
 * Ima Williams
 * 
 * The variation is called hyperspeed. It's a chaotic version where everything is extremely fast and
 * there is no way to control the tongue and know if you caught a fly.
 * There are 2 modes to venture through
 * 
 * 
 * Instructions:
 * - Move the frog with your left and right keys
 * - Spacebar to launch the tongue
 * - Catch flies
 * - Golden fly is the savior 
 * - silver fly is the tricker
 * 
 * Prof. Pippin Baar's Frogfrogfrog base game
 * Just a variation
 * Made with p5
 * https://p5js.org/
 */

"use strict";

//Game State
let gameState = "play"

//Arrays for many flies
let flies = [];
let silverFlies = [];
let jarFlies = [];

//for score
let score = 0;
let angle;

//Golden Fly effects
let goldentrail = [];
let sparkles = [];

//Hypermode
let hypermode = false;
let hyperDialogueTimer = 0;

//Music
let hypermodeMusic;
let regularBgMusic;


// Our frog
let frogGlow = 0
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

const goldenFly = {
    x: 0,
    y: (100, 200),//will be random
    size: 8,
    speed: 30,
    fill: "#ffe760ff"


}

const jar = {
    x: 550,
    y: 20,
    width: 70,
    height: 90


}


//Add a background music to the game
function preload() {
    regularBgMusic = loadSound("assets/sounds/game-minecraft-gaming-background-music-402451.mp3");
    hypermodeMusic = loadSound("assets/sounds/royal-reckoning-background-game-music-for-video-224645.mp3")
}


/**
 * Creates the canvas and initializes the fly
*/
function hyperSpeedSetup() {

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


function hyperSpeedDraw() {
    background("#87ceeb");



    // Play regular music if in regular mode and it's not playing already
    if (gameState === "play" && !hypermode && !regularBgMusic.isPlaying()) {
        regularBgMusic.loop();  // Start or loop the regular music
        hypermodeMusic.stop(); // Ensure hypermode music stops if it's playing
    }

    // Play hypermode music if hypermode is active and it's not playing already
    if (gameState === "play" && hypermode && !hypermodeMusic.isPlaying()) {
        hypermodeMusic.loop();  // Start or loop the hypermode music
        regularBgMusic.stop(); // Ensure regular music stops if it's playing
    }

    // Stop music when the game is over or paused
    if (gameState === "win" || gameState === "lose" || gameState === "pause") {
        regularBgMusic.stop();
        hypermodeMusic.stop();
    }


    //Screen will pause and say engage hypermode  
    if (gameState === "pause") {
        push();
        textAlign(CENTER);
        textSize(48);
        fill("#fc1f10ff");
        stroke("#f93737ff");
        strokeWeight(4);
        text("Engage Hypermode!", width / 2, height / 2);
        pop();

        hyperDialogueTimer--;
        if (hyperDialogueTimer <= 0) {
            startHypermode();
            gameState = "play"
        }
        return; // pause everything else
    }

    if (gameState === "play") {
        for (let fly of flies) {
            moveFly(fly);
            drawFly(fly);
            checkTongueFlyOverlap(fly, false);
        }

        for (let silverfly of silverFlies) {
            moveFly(silverfly);
            drawSilverFly(silverfly);
            checkTongueFlyOverlap(silverfly, true);
        }

        //Goldenfly and it's effect
        moveGoldenFly();
        drawGoldenTrail();
        drawGoldenFly();
        createGoldenFlyingSparkles();
        drawSparkles();
        tongueGoldenFlyOverlap();

        //The frog
        moveFrog();
        moveTongue();
        drawFrog();
        drawCaptureJar();
    }

    //Win Screen
    else if (gameState === "win") {
        drawSparkles()
        drawWinSpeech();
        return;
    }

    //Lose Screen
    else if (gameState === "lose") {
        drawLoseSpeech()
    }



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
    fill(fly.fill);
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
    fly.y = random(50, 300);
}

/**
 * Golden fly moves at hyper speed
 */
function moveGoldenFly() {
    goldenFly.x += goldenFly.speed

    goldentrail.push({
        x: goldenFly.x,
        y: goldenFly.y,
        size: random(3, 6),
        alpha: 255
    });

    if (goldentrail.length > 50) goldentrail.shift();

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

function drawGoldenTrail() {
    noStroke();
    for (let t of goldentrail) {
        fill(255, 230, 80, t.alpha); // using alpha for the opacity. Learn that alpha is for opacity change. Wanted to give it a try
        ellipse(t.x, t.y, t.size);
        t.alpha -= 8; //use t for trail 
    }
    goldentrail = goldentrail.filter(t => t.alpha > 0);

}

function createGoldenFlyingSparkles() {
    sparkles.push({
        x: goldenFly.x + random(-2, 2),
        y: goldenFly.y + random(-2, 2),
        vx: random(-1, 1),
        vy: random(-1, 1),
        size: random(2, 4),
        life: 30,
        color: color(random(200, 255), random(180, 255), 0)
    });
}

function drawSparkles() {
    for (let s of sparkles) {
        fill(s.color);
        noStroke();
        ellipse(s.x, s.y, s.size);
        s.x += s.vx;
        s.y += s.vy;
        s.life--;
    }
    sparkles = sparkles.filter(s => s.life > 0);
}






function tongueGoldenFlyOverlap() {
    const d = dist(frog.tongue.x, frog.tongue.y, goldenFly.x, goldenFly.y);

    if (d < frog.tongue.size / 2 + goldenFly.size / 2 && gameState === "play") {
        gameState = "win";

        //Going to make fireworks appears
        for (let i = 0; i < 60; i++) {
            sparkles.push({
                x: goldenFly.x,
                y: goldenFly.y,
                vx: random(-3, 3),
                vy: random(-3, 3),
                size: random(2, 4),
                life: random(40, 80),
                color: color(random(200, 255), random(180, 255), random(0, 255))
            });
        }
    }

}

function resetGoldenFly() {
    goldenFly.x = 0
    goldenFly.y = random(0, 250)

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

    if (frogGlow > 0) {
        push();
        noStroke();
        let fogPulse = 30 + sin(frameCount * 2) * 8;
        for (let i = 0; i < 4; i++) {
            fill(200, 255, 200, 40 - i * 8);
            ellipse(frog.body.x, frog.body.y, frog.body.size + fogPulse + i * 25);
        }
        pop();
        frogGlow--;
    }

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

    //Draw the frog's green eye
    //The left eye 
    push();
    fill(frog.eyelid.fill)
    noStroke();
    ellipse(frog.body.x - 45, frog.body.y - 70, frog.body.size - 105);
    pop();
    //The right eye 
    push();
    fill(frog.eyelid.fill);
    noStroke();
    ellipse(frog.body.x + 45, frog.body.y - 70, frog.body.size - 105);
    pop();

    //Draw the frog's white part of the eye
    // //The left eye
    push();
    fill(frog.eye.fill);
    noStroke();
    ellipse(frog.body.x - 45, frog.body.y - 70, frog.body.size - 120);
    pop();

    //The right eye
    push();
    fill(frog.eye.fill);
    noStroke();
    ellipse(frog.body.x + 45, frog.body.y - 70, frog.body.size - 120);
    pop();

    //The pupil
    //The right pupil 
    push();
    fill(frog.pupil.fill);
    noStroke();
    ellipse(frog.body.x - 45, frog.body.y - 73, frog.body.size - 130);
    pop();

    //The left pupil
    push();
    fill(frog.pupil.fill);
    noStroke();
    ellipse(frog.body.x + 45, frog.body.y - 73, frog.body.size - 130);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap(fly, silverfly) {
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
        //frogGlow = 15;

        if (silverfly) {
            if (!hypermode) {
                gameState = "pause";
                hyperDialogueTimer = 120; // ~2 seconds
            }
            else {
                gameState = "lose";
            }
        }
        else {

            frogGlow = 15; // glow effect for normal flies
        }
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


/**
 * HYPERMODE ENGAGE
*/
function startHypermode() {
    hypermode = true;
    goldenFly.speed = 30;
    frog.tongue.speed = 150; // 5x faster
    for (let f of flies) f.speed *= 5;
    silverFlies = [silverFlies[0]]; // only 1 silverfly
    silverFlies[0].speed *= 5;
}



function keyPressed() {
    if (keyCode === 32 && frog.tongue.state === "idle") frog.tongue.state = "outbound";
    if (key === "r" && (gameState === "win" || gameState === "lose")) restartGame();
}


/**
 * Restarting the game
 */
function restartGame() {
    // Reset game state and score
    gameState = "play";
    score = 0;
    frogGlow = 0;
    hypermode = false;  // Reset hypermode here!

    // Reset frog's tongue state
    frog.tongue.state = "idle";
    frog.tongue.y = 480;  // Reset tongue to starting position

    // Reset flies
    flies = [];
    silverFlies = [];

    // Reset frog's speed and the speed of all flies
    frog.tongue.speed = 30;  // Default tongue speed
    for (let i = 0; i < 3; i++) {
        flies.push({
            x: 0,
            y: random(100, 200),
            size: 10,
            speed: random(10, 30),
            fill: "#000"
        });
    }

    for (let i = 0; i < 2; i++) {
        silverFlies.push({
            x: 0,
            y: random(50, 250),
            size: 12,
            speed: random(5, 15),
            fill: "#d6d4d4ff"
        });
    }

    // Reset the golden fly and its trail
    resetGoldenFly();
    goldentrail = [];
    sparkles = [];
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


function drawLoseSpeech() {
    push();
    textAlign(CENTER);
    textSize(80);
    fill("#ff3636ff");
    stroke("#ff0000");
    strokeWeight(4);
    text("YOU LOSE!", width / 2, height / 2);

    textSize(30);
    fill("#ffffff");
    noStroke();
    text("Press R to Restart", width / 2, height / 2 + 50);
    pop();


}



