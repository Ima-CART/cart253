"use strict";

let x = 0;
let y = 0;
let color = 0;
let x2 = 500;




/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
    background("pink");

}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    color = 0;
    while (x <= 500) {
        stroke(color);
        line(x, y, x, 500);
        x += 50;
        y = 0;
        color += 25;

    }
    color = 0;
    while (y <= 500) {
        stroke(color);
        line(x, y, x2, y);
        x = 0;
        y += 50;
        color += 25;

    }

    /*stroke(0);
    line(0, 0, 0, height);

    stroke(25);
    line(50, 0, 50, height);

    stroke(50);
    line(100, 0, 100, height);

    stroke(75);
    line(150, 0, 150, height);

    stroke(100);
    line(200, 0, 200, height);

    stroke(125);
    line(250, 0, 250, height);

    stroke(150);
    line(300, 0, 300, height);

    stroke(175);
    line(350, 0, 350, height);

    stroke(200);
    line(400, 0, 400, height);

    stroke(225);
    line(450, 0, 450, height);

    stroke(250);
    line(500, 0, 500, height);*/
}