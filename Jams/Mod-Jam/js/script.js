/**
 * Frog in a Swamp
 * Ima Williams
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Make the frog move left and right with the keyboard
 * - Click to launch the tongue
 * - Catch flies
 * -Avoid eating the bumblebee and the hidden bat
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// The title screen
let gameState = "titlescreen";


//scoreboard
let score = 0
let daytime = true//setting function for day time
let angle; //setting the able for the fly

//inserting images
let flyicon;
let frogeatingfly;
let batflyingIMG;
let bumblebeeflying;
let houseflyIMG;
let frogonlilypad;

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
        size: 180,
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
        fill: {
            r: 255,
            g: 0,
            b: 0,
        },

        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    },

    //The frog's eyes
    //the white part of the eye
    eye: {
        x: 270,
        y: 440,
        size: 55,
        fill: {
            r: 255,
            g: 255,
            b: 255
        },
    },

    //The pupil
    pupil: {
        x: 270,
        y: 440,
        size: 40,
        fill: {
            r: 0,
            g: 0,
            b: 0
        },
    },

};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 12,
    speed: 3
};


//Second insect. The infamous bumblebee
const bumblebee = {
    x: 240,
    y: 200,
    size: 30,
    speed: 20,
    length: 45,
    active: false //the bumblebee will start of invisible 
}

// the secret creature that comes at night 
const batflying = {
    x: 0,
    y: 10,
    size: 100,
    speed: 10,
    active: false// the bat will only come out at night
}

//Images that will be added to the game 
function preload() {
    flyicon = loadImage("assets/images/fly-silhouette-vector copy.png");
    frogeatingfly = loadImage("assets/images/cartoon-frog-sitting-on-a-lily-pad-catching-a-fly.png");
    batflyingIMG = loadImage("assets/images/flying-bat-silhouettes-with-wings.png");
    bumblebeeflying = loadImage("assets/images/Bumblebee-Flying.png");
    houseflyIMG = loadImage("assets/images/house-fly-24629_1280.png");
    frogonlilypad = loadImage("assets/images/Frog-On-Lilypad.png")

}

/**
 * Handles all the buttons
 */

const instructionsButton = {
    x: 240,
    y: 370,
    height: 50,
    length: 150
}

const startButton = {
    x: 240,
    y: 400,
    height: 50,
    length: 150
}



/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    angleMode(DEGREES); //added angle for the fly sin function
    angle = 0; //added angle for the fly sin function

    // Give the fly its first random position
    resetFly();

    //reset the positon of the bumblebee at a random position
    resetBumblebee();

    //reset the position of the flyingbat at random
    resetBatFlying();

    //the bat will only appear at night
    batflying.active = false;
}

function draw() {

    /**
     * The game start from the title screen then goes to the instruction then the game
     */

    if (gameState === "titlescreen") {

        drawTitleScreen();

    }

    else if (gameState === "instruction") {
        drawInstructionScreen();
    }

    else if (gameState === "game") {

        //The sky backgrpund will become over a short period of time
        background(sky.r, sky.g, sky.b);
        sky.r = constrain(sky.r - .1, 5, 135)
        sky.g = constrain(sky.g - .1, 55, 206)
        sky.b = constrain(sky.b - .1, 110, 235)
        if (sky.r === 5 && sky.g === 55 && sky.b === 110) {
            daytime = false
        }


        //The lake
        push();
        fill("#488ec4ff");
        stroke("#488ec4ff")
        rect(0, 380, 640, 150);
        pop();

        //Lily pads
        push();
        fill("#02bd02ff")
        arc(80, 440, 70, 30, 60, PI);
        arc(150, 410, 50, 20, 0, 270, PI);
        arc(300, 420, 50, 20, 0, 330, PI);
        arc(500, 410, 70, 30, 60, PI);
        arc(560, 450, 50, 20, 0, 270, PI);
        pop();

        //Grass
        push();
        stroke("#05A805")
        fill("#05A805");

        //Grass on the left side
        bezier(20, 440, 20, 400, 15, 380, 25, 330);
        bezier(15, 440, 15, 400, 10, 380, 15, 330);
        bezier(30, 440, 30, 400, 25, 380, 35, 330);
        bezier(10, 440, 10, 400, 5, 380, 10, 330);
        bezier(40, 440, 35, 400, 30, 380, 45, 330);
        bezier(50, 430, 50, 400, 45, 380, 55, 330);
        bezier(60, 420, 60, 400, 55, 380, 65, 330);


        //Grass on the right side
        bezier(620, 440, 620, 400, 615, 380, 625, 330);
        bezier(615, 440, 615, 400, 610, 380, 615, 330);
        bezier(610, 440, 610, 400, 615, 380, 605, 330);
        bezier(630, 440, 630, 400, 635, 380, 630, 330);
        bezier(600, 440, 605, 400, 610, 380, 595, 330);
        bezier(590, 430, 590, 400, 595, 380, 585, 330);
        bezier(580, 420, 580, 400, 585, 380, 575, 330);

        pop();


        moveFly();
        drawFly();

        //the bumblebee will start of invisible and only when visible does the function draws it
        if (bumblebee.active) {
            drawBumblebee();
            moveBumblebee();
            checkTongueBumblebeeOverlap();
            bumblebeeFlyOverlap();
        }


        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        drawScoreBoard();
        if (batflying.active) {
            drawBatFlying();
            moveBatFlying();
            checkTongueBatFlyingOverlap();
            batflyingFlyOverlap();

        }

    }

    /**
     * Game ends when the frog can no longer continue
     */
    else if (gameState === "end") {
        drawEndScreen();
    }

}


/**
 * Draw the titlescreen 
 * Title will begin at the beginning of the game
 */

function drawTitleScreen() {
    background(sky.r, sky.g, sky.b);
    image(frogeatingfly, 240, 320, 100, 100);
    textSize(48);
    text("Frog in a swamp", 250, 370, 50, 60)


}


/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    //fly will be buzzing and movin in a wave using the sin function
    let buzzingY = sin(angle) * 20;
    fly.y = constrain(fly.y - buzzingY, 0, 460);
    angle += 20;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}


/**
 * Draws the fly as a black circle
 */
function drawFly() {

    //Drawing the top wing
    push();
    noStroke();
    //strokeWeight(1);
    fill("#ffffffc2");
    ellipse(fly.x, fly.y - 10, fly.size - 3);
    pop();

    //Drawing the bottom wing
    push();
    noStroke();
    fill("#ffffffc2");
    ellipse(fly.x, fly.y + 10, fly.size - 3);
    pop();


    //The fly body
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

    //Draw wing 1
    push();
    fill("#E6F9FBhe")
    ellipse(bumblebee.x + 18, bumblebee.y - 3, bumblebee.length - 30, bumblebee.size - 3, 20
    );
    pop();

    //Draw wing 2
    push();
    fill("#E6F9FBhe")
    ellipse(bumblebee.x + 25, bumblebee.y - 3, bumblebee.length - 30, bumblebee.size - 3, 20
    );
    pop();

    //Draw bumblebee body
    push();
    strokeWeight(2);
    fill("#fff563ff");
    rect(bumblebee.x, bumblebee.y, bumblebee.length, bumblebee.size, 50);
    pop();

    //Bumble Stripe 1
    push();
    fill("#000");
    rect(bumblebee.x + 13, bumblebee.y, bumblebee.length - 40, bumblebee.size,
    );
    pop;

    //Bumble Stripe 2
    push();
    fill("#000");
    rect(bumblebee.x + 28, bumblebee.y, bumblebee.length - 40, bumblebee.size,
    );
    pop;

    //Bumble stinger
    push();
    fill("#000"); triangle(bumblebee.x, bumblebee.y + 10, bumblebee.x, bumblebee.y + 20, bumblebee.x - 8, bumblebee.y + 15);
    pop();

    //Bumble eyes
    push();
    fill("#000");
    ellipse(bumblebee.x + 39, bumblebee.y + 10, bumblebee.size - 26);
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
    //frog.body.x = mouseX;

    if (keyIsDown(LEFT_ARROW)) {
        frog.body.x = constrain(frog.body.x - 4, 10, 630)
    }

    else if (keyIsDown(RIGHT_ARROW)) {
        frog.body.x = constrain(frog.body.x + 4, 10, 630)
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
    fill(frog.tongue.fill.r, frog.tongue.fill.g, frog.tongue.fill.b);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke(frog.tongue.fill.r, frog.tongue.fill.g, frog.tongue.fill.b);
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill(frog.body.fill.r, frog.body.fill.g, frog.body.fill.b);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    //Draw the frog's white part of the eye
    //The right eye
    push();
    fill(frog.eye.fill.r, frog.eye.fill.g, frog.eye.fill.b)
    noStroke();
    ellipse(frog.body.x - 50, frog.body.y - 80, frog.body.size - 125)
    pop();

    //The left eye
    push();
    fill(frog.eye.fill.r, frog.eye.fill.g, frog.eye.fill.b)
    noStroke();
    ellipse(frog.body.x + 50, frog.body.y - 80, frog.body.size - 125)
    pop();

    //The pupil
    //The right pupil
    push();
    fill(frog.pupil.fill.r, frog.pupil.fill.g, frog.pupil.fill.b)
    noStroke();
    ellipse(frog.body.x - 50, frog.body.y - 80, frog.body.size - 140)
    pop();

    //The left pupil
    push();
    fill(frog.pupil.fill.r, frog.pupil.fill.g, frog.pupil.fill.b)
    noStroke();
    ellipse(frog.body.x + 50, frog.body.y - 80, frog.body.size - 140)
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
        frog.body.fill.g = constrain(frog.body.fill.g + 100, 0, 255)
        //change color of the white part of the eye
        frog.eye.fill.r = constrain(frog.eye.fill.r + 100, 0, 255)
        frog.eye.fill.g = constrain(frog.eye.fill.g + 100, 0, 255)
        frog.eye.fill.b = constrain(frog.eye.fill.b + 100, 0, 255)
        score = score + 1;
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
        frog.body.fill.g = constrain(frog.body.fill.g - 100, 0, 255)
        //change color of the white part of the eye
        frog.eye.fill.r = constrain(frog.eye.fill.r - 100, 0, 255)
        frog.eye.fill.g = constrain(frog.eye.fill.g - 100, 0, 255)
        frog.eye.fill.b = constrain(frog.eye.fill.b - 100, 0, 255)
        if (frog.body.fill.g === 0) { gameState = "end" }

    }

}

/**
 * Function for the bumblebee overlapping the fly
 */

function bumblebeeFlyOverlap() {
    //Get the distance from bumblebee to fly
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

    else if (gameState === "titlescreen" && mouseX < instructionsButton.x + instructionsButton.length / 2 && mouseY < instructionsButton.y + instructionsButton.height / 2
        && mouseX > instructionsButton.x - instructionsButton.length / 2 && mouseY > instructionsButton.y - instructionsButton.height / 2) {
        gameState = "instruction"
    }

    else if (gameState === "instruction" && mouseX > startButton.x && mouseX < startButton.x + startButton.length && mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
        gameState = "game"

    }
}


// Handles scoreboard
function drawScoreBoard() {


    if (score >= 5 && daytime) {
        bumblebee.active = true;
    }

    else if (!daytime) {
        bumblebee.active = false
        batflying.active = true
    }





    //image of the flyicon
    push()
    image(flyicon, 566, 405, 64, 64);
    pop();



    // The fly counter
    textSize(20);
    textAlign(CENTER);
    fill("#fff");
    text(score, 600, 450);

}

/**
 * Drawinf the function of the bat and using an image
 */
function drawBatFlying() {

    image(batflyingIMG, batflying.x, batflying.y);


}

/**
 * handle the movement of the bat random
 */
function moveBatFlying() {
    // Move the fly
    batflying.x += batflying.speed;
    ///batflying will be buzzing and movin in a wave using the sin function
    let buzzingY = sin(angle) * 40;
    batflying.y = constrain(batflying.y - buzzingY, 0, 460);
    angle += 20;
    // Handle the batflying going off the canvas
    if (batflying.x > width) {
        resetBatFlying();
    }


}
/**
 * Batflying resets at random when it reaches max width
 */
function resetBatFlying() {
    batflying.x = 0;
    batflying.y = random(0, 300);
}

/**
 *  Tongue overlapping the Batflying
 */
function checkTongueBatFlyingOverlap() {
    // Get distance from tongue to Batflying
    const d = dist(frog.tongue.x, frog.tongue.y, batflying.x, batflying.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size + batflying.size);
    if (eaten) {
        // Reset the fly
        resetBatFlying();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //Change the color of the frog
        frog.body.fill.g = constrain(frog.body.fill.g - 100, 0, 255)
        //change color of the white part of the eye
        frog.eye.fill.r = constrain(frog.eye.fill.r - 100, 0, 255)
        frog.eye.fill.g = constrain(frog.eye.fill.g - 100, 0, 255)
        frog.eye.fill.b = constrain(frog.eye.fill.b - 100, 0, 255)
        if (frog.body.fill.g === 0) { gameState = "end" }
    }

}

/**
 * Handles the batflying fly overlap
 */
function batflyingFlyOverlap() {
    //Get the distance from batflying to fly
    const d = dist(fly.x, fly.y, batflying.x, batflying.y);
    //check overlap
    const overlap = (d < fly.size / 2 + batflying.size)
    if (overlap) {
        // Reset fly (Flies are the prey. When bumblebee overlaps, they get eaten)
        resetFly();
    }


}


/**
 * Drawing the title screen
 */
function drawTitleScreen() {
    background(sky.r, sky.g, sky.b);
    image(frogeatingfly, 200, 150, 250, 250);
    textAlign(CENTER);
    textSize(48);
    text("Frog in a swamp", 200, 50, 240, 200);

    //instructions button
    push();
    strokeWeight(2);
    fill("#81ef85ff");
    rect(instructionsButton.x, instructionsButton.y, instructionsButton.length, instructionsButton.height, 30);
    pop();
    //text in button
    push();
    fill("#000000ff");
    textAlign(CENTER);
    textSize(28);
    text("Instructions", instructionsButton.x, instructionsButton.y + 11, instructionsButton.length, instructionsButton.height);
    pop();

}

//Instructions Page
function drawInstructionScreen() {
    background(sky.r, sky.g, sky.b);
    image(houseflyIMG, 100, 10, 70, 70);
    image(bumblebeeflying, 450, 280, 150, 150)
    textAlign(CENTER);
    textSize(48);
    text("Instructions", 200, 30, 250, 250);
    textSize(16)
    text("The starving frog just wants to eat flies in peace", 80, 100, 500, 100);
    text("Move the frog left and right with the keyboard", 80, 130, 500, 400);
    text("Click on the mouse to launch the tongue and eat what is in sight", 80, 160, 500, 400);
    text("You aren't the only ones hungry", 80, 250, 500, 400,);
    text("Eat flies without interacting with your competition to gain life", 80, 280, 500, 400);
    text("Touch your competition and the frog get sick. Touch them 3 times and you die", 80, 310, 480, 400);
    text("Last note: The day will change and the competiton will become harder", 80, 360, 500, 400)
    textSize(36);
    text("Beeware", 200, 200, 250, 250)


    //Start button
    push();
    strokeWeight(2);
    fill("#81ef85ff");
    rect(startButton.x, startButton.y, startButton.length, startButton.height, 30);
    pop();

    //text in button
    push();
    fill("#000000ff");
    textAlign(CENTER);
    textSize(36);
    text("Start", startButton.x, startButton.y + 8, startButton.length, startButton.height);
    pop();

}

/**
 * The end screen
 */
function drawEndScreen() {
    background("#000");
    image(frogonlilypad, 150, 130, 350, 245);
    textAlign(CENTER);
    textSize(48);
    fill("#fff");
    text("GAME OVER", 80, 70, 500, 300)


    //text in button
    push();
    fill("#81ef85ff");
    textAlign(CENTER);
    textSize(30);
    text("Ctrl+R to retry", 70, 350 + 43, 500, 300);
    pop();



}

