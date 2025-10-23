/**
 * Bouncy Ball Ball Bonanza
 * Ash & Ima
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball

let ball1 = {
    x: 200,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 1,
    }

}
let ball2 = undefined;

/**const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 5,
    }
};
*/

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
    ball2 = {
        x: 400,
        y: 20,
        width: 10,
        height: 10,
        velocity: {
            x: 0,
            y: random(2, 10),
        }

    }

}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    moveBall(ball1);
    moveBall(ball2);

    handleBounce(ball1);
    handleBounce(ball2);

    drawPaddle(paddle);
    drawBall(ball1);
    drawBall(ball2);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = mouseX;

}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.y += ball.velocity.y;

}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball) {
    const overlap = checkOverlap(ball, paddle);
    if (overlap) { ball.velocity.y *= -1; }

}

/** 
function ballOverlap(ball, paddle) {
    let result = (
        ball.x + ball.size > paddle.x &&
        ball.x < paddle.x + paddle.width &&
        ball.y + ball.size > paddle.y &&
        ball.y < paddle.y + paddle.height);
    return result;


}
*/
/**
 * Draws the specified paddle on the canvas
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

/**
 * Draws the specified ball on the canvas
 */
function drawBall(ball) {

    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(ball.x, ball.y, ball.width, ball.height);
    pop();
}

/**
 * Returns true if ball and paddle overlap, and false otherwise
 * Assumes ball and paddle have properties x, y, width and height to describe
 * their ballngles, and that ball and paddle are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(ball, paddle) {
    return (ball.x + ball.width / 2 > paddle.x - paddle.width / 2 &&
        ball.x - ball.width / 2 < paddle.x + paddle.width / 2 &&
        ball.y + ball.height / 2 > paddle.y - paddle.height / 2 &&
        ball.y - ball.height / 2 < paddle.y + paddle.height / 2);
}