/**
 * Art Jam Self Portrait
 * Ima Williams
 * 
 * Creating a semi realistic portrait of myself
 *
 */

"use strict";

/**
 * Canvas set up
*/
function setup() {
    createCanvas(640, 640);
    //setting the units of the arcs
   //setting up the angle of the arcs
   angleMode(degrees);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/


function draw() {

    //starting of with naming all the required functions for this project
    Drawbackground();
    Drawface();
    Drawbrow();
    Draweyes();
    Drawneck();
    Drawhair();
    Drawsweater();
    Drawears();
    Drawnose();
    Drawmouth();
    
    // Starting of wiht a nice light blue background
function Drawbackground(){
     push();
     background(143, 234, 255);
     pop();

    }
    //Draw face
    function Drawface(){
     push();
     noStroke();
     fill("#8d6241ff");
     ellipse(320,280,200,270);
     pop();
    
    }
    function Drawbrow() {
     push();
     noFill();
     stroke("#2b2418ff");
     strokeWeight(3);
     arc(275, 270, 50, 30, 154, 270.1);  
     arc(365, 270, 50, 30, 154, 270.1); 
     pop(); 
    }


    
}
