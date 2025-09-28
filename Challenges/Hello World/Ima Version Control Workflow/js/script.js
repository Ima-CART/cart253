/**
 * Git Workflow Example
 * Pippin Barr
 * 
 * Some sample code for playing with version control.
 * Draws a pyramid in the centre of the canvas and a
 * red circle at the user's mouse position.
 */

"use strict";

/**
 * Create a canvas, hides the cursor
*/
function setup() {
    // A 640x480 canvas
    createCanvas(640, 640);

    // Don't show the cursor
    noCursor();
}

/**
 * Draws a top-down view of a pyramid and also a teal oval
 * at the position of the user's cursor
*/
function draw() {
    // Make the background blue (specified as RGB)
    background(25, 160, 191);

    // Draw a pyramid
    // How many levels for the pyramid
    const levels = 13;
    // Loop through every level (backwards)
    for (let level = levels; level > 0; level--) {
        // Draw this layer
        push();
        // Set the grey shade of the level based on its number
        // e.g. level 1 will get a shade of 10 (dark gray), 
        // level 10 will be 255(white)
        const shade = map(level, 1, levels, 10, 255);
        // No line around the levels
        noStroke();
        // Set the fill colour to our shade (RGB)
        fill(shade, shade, 0);
        // Draw rectangles from the centre
        rectMode(CENTER);
        // Draw the rectangle in the centre of the canvas
        // (320, 320) with a size based on the level
        // e.g. level 1 will be a 32x32 rectangle and
        // level 10 will be a 320x32 rectangle
        rect(320, 320, level * 32, level * 32);
        pop();
    }

    // Draw a teal oval at the position of the mouse
    push();
    // No line around the shape
    noStroke();
    // Make it teal; (RGB)
    fill(25, 191, 136);
    // Draw a 90x60 oval at the mouse position
    ellipse(mouseX, mouseY, 90, 60);
    pop();
}