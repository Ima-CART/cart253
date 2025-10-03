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

//setting up the units and angle of the arcs
    angleMode(DEGREES);
    
}


/**
 * Setting all the draw functions in the draw
*/


function draw() {
    
//starting of with naming all the required functions for this project
    Drawbackground();
    Drawhair();
    Drawhood();
    Drawface();
    Drawtshirt();
    Drawneck();
    Drawbrow();
    Draweyes();
    Drawnose();
    Drawmouth();
    Drawears();
    Drawsweater();
    Drawbangs();

    
// A ever changing background that depends on the mouse
//Conditional used in order to change the background depending on the mouse movement on the x-axis 
    function Drawbackground(){
      if (mouseX < 200){
    background(166,249,255);
  } else if (mouseX >= 200 && mouseX < 400){
    background(176,149,232);
  } else if (mouseX >= 400){
    background(255, 235, 235);
  } 
    
}
    
//Drawing the hair starting off with the hair in the back
function Drawhair(){
    push();
    noStroke();
    fill("#957011ff");
    ellipse(320,285,270,350); // This is the hair in the back.
    pop();
}

//The hoodie's hood will be here since it's in the back
function Drawhood (){
    push();
    stroke("#0619c5ff");
    strokeWeight(12);
    fill("#000c7aff");
    ellipse(320, 470, 230, 150);
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
    
//Drawing the inner tshirt
function Drawtshirt() {
    push();
    noStroke();
    fill(mouseX,mouseY,10); //The inner tshirt will be changing colors
    rect(180, 450, 280, 250,80);
    fill("#f1f5ffff");
    ellipse(320, 460, 85, 65); //The neckline
    pop();
}

//Drawing the neck
function Drawneck(){
    push();
    noStroke();
    fill("#8d6241ff");
    rect(280, 350, 80, 130,40);
    pop();
       
}
//Using a new function in order to make the eyebrow, the arc function 
//Drawing Eyebrows    
function Drawbrow() {
        push();
        noFill();
        stroke("#2b2418ff");
        strokeWeight(2);
        arc(275, 260, 60, 20, 180, 0); //Left eyebrow  
        arc(365, 260, 60, 20, 180, 0); //Right eyebrow
        pop(); 
}
    
//Drawing the eyes
function Draweyes() {
    push();    
    noStroke();

//Starting of with the left eye
    ellipse(275, 275, 55, 30); //The white part of the eye 
    push(); //I don't want the colors to fall on the second eye. I verified without push and pop it does 
    fill("#5c3427f2");
    ellipse(275,275,30,30); //The brown eyeball
    fill("#000000ff");
    ellipse(275,275,15,15); //The iris
    fill("#fff");
    ellipse(280,268,8,8); //The reflection
    pop();
        
//The right eye
    ellipse(365, 275, 55, 30); //The white part of the eye
    push(); //Keeping the same consistency as the first eye
    fill("#5c3427f2");
    ellipse(365,275,30,30); //The brown eyeball
    fill("#000000ff");
    ellipse(365,275,15,15); //the iris
    fill("#fff");
    ellipse(370,268,8,8); //The reflection
    
    
    pop();
}
    
//Drawing the nose
function Drawnose(){
    push();
    noFill();
    stroke("#2b2418ff");
    strokeWeight(2);
    arc(320,320,20,20,0,180);
    pop();
}



//Drawing the mouth
function Drawmouth(){

//Starting with the the upperlip
    push();
    fill("#6e3313ff");
    noStroke();
    arc(315,365, 40, 20, 180, 0);
    arc(330,365, 40, 20, 180, 0);
    
//Lower lip
    ellipse(322,363, 50, 15); 
    pop();    
}

//Drawing the Ears
function Drawears(){
    push();
    fill("#8d6241ff");
    ellipse(420,285,40,55); //The right ear
    ellipse(220,285,40,55); //The left ear
    pop();
}

//Drawing the sweater
function Drawsweater(){
    push();
    fill("#0619c5ff");
   //Left side hoodie
    ellipse(240, 570, 120, 250); //The inner sweater
    ellipse(210, 590, 100, 250); //The outer sweater arm

   //Right side hoodie
    ellipse(400, 570, 120, 250); //The inner sweater
    ellipse(430, 590, 100, 250); //The outer sweater arm
    pop();
}

//Used a couple of new function, translate, rotate for the top of the hair and beziervertex to get the extra strand hair
//Finishing the hair and drawing the bangs
function Drawbangs() {
    push();
    noStroke();
    fill("#957011ff");

//Right bangs
    push();
    translate(365, 190);
    rotate(-55);
    ellipse(0,0,100,170);
    pop();
    push();

//Left Bangs
     push();
     translate(275,190);
     rotate(55);
     ellipse(0, 0, 100, 175);
     pop();

 //Right strand
     beginShape();
     translate(350,230);
     vertex();
     bezierVertex(80, 0, 80, 75, 30, 120);
     bezierVertex(50, 80, 60, 25, 30, 20);
     endShape();
     pop();

//Left strand
     beginShape();
     translate(200,225);
     vertex();
     bezierVertex(10, 0, 0, 100, 60, 120);
     bezierVertex(10, 70, 40, 40, 60, 20);
     endShape();
     pop();

     pop();
}

}


