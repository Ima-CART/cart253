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
    Drawnose();
    Drawmouth();
    Drawears();
    Drawneck();
    Drawhair();
    Drawsweater();
    
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

    //Drawing Eyebrows    
function Drawbrow() {
     push();
     noFill();
     stroke("#2b2418ff");
     strokeWeight(2);
     arc(275, 260, 60, 20, 154, 270.1); //Left eyebrow  
     arc(365, 260, 60, 20, 154, 270.1); //right eyebrow
     pop(); 
    }

function Draweyes() {
    push();
    
    noStroke();
    
    //Starting of with the left eye
    ellipse(275, 275, 55, 30);//the white part of the eye 
    push(); //I don't want the colors to fall on the second eye. I verified without push and pop it does 
    fill("#5c3427f2");
    ellipse(275,275,30,30) //the brown eyeball
    fill("#000000ff")
    ellipse(275,275,15,15)  // the iris
    fill("#fff")
    ellipse(280,268,8,8) // the reflection
    pop();

    //The right eye
    ellipse(365, 275, 55, 30);
    push();// Keeping the same consistency as the first eye
    fill("#5c3427f2");
    ellipse(365,275,30,30) //the brown eyeball
    fill("#000000ff")
    ellipse(365,275,15,15)  //the iris
    fill("#fff")
    ellipse(370,268,8,8) // the reflection

    pop();
        
}

//drawing the nose
function Drawnose(){
push();
noFill();
stroke("#2b2418ff");
strokeWeight(2);
arc(320,310,25,30,170,185)
pop();
}




}
//**" */