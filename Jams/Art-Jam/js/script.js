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
    
    // Starting of wiht a nice light blue background
    function Drawbackground(){
    push();
    background(mouseX, mouseY,255 );
    pop();   
}
    
    //Drawing the hair
function Drawhair(){
    push();
    noStroke();
    fill("#957011ff");
    ellipse(320,285,270,350); // this is the hair in the back.
    pop();
}

    //The hoodie hood will be here since it's in the back
function Drawhood (){
    push();
    stroke("#0619c5ff")
    strokeWeight(12)
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
    fill(mouseX,mouseY,10);
    rect(180, 450, 280, 250,80)
    fill("#f1f5ffff")
    ellipse(320, 460, 85, 65)//the neckline
    pop();
}

//drawing the neck
function Drawneck(){
    push();
    noStroke();
    fill("#8d6241ff")
    rect(280, 350, 80, 130,40)
    pop();
       
}
    //Drawing Eyebrows    
function Drawbrow() {
        push();
        noFill();
        stroke("#2b2418ff");
        strokeWeight(2);
        arc(275, 260, 60, 20, 180, 0); //Left eyebrow  
        arc(365, 260, 60, 20, 180, 0); //right eyebrow
        pop(); 
    }
    
    //Drawing the eyes
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
    arc(320,320,20,20,0,180)
    pop();
}



//drawing the mouth
function Drawmouth(){
    //drawing the upperlip
    push();
    fill("#6e3313ff");
    noStroke();
    arc(315,365, 40, 20, 180, 0);
    arc(330,365, 40, 20, 180, 0);
    
    //Lower lip
    ellipse(322,363, 50, 15,); 
    pop();    
}

//Drawing the Ears
function Drawears(){
    push();
    fill("#8d6241ff")
    ellipse(420,285,40,55) //The right ear
    ellipse(220,285,40,55) //The left ear
    pop();
}

//Drawing the sweater
function Drawsweater(){
    push();
    fill("#0619c5ff")
   //Left side hoodie
    ellipse(240, 570, 120, 250);//the inner sweater
    ellipse(210, 590, 100, 250);//the outer sweater arm

   //Right side hoodie
    ellipse(400, 570, 120, 250);//the inner sweater
    ellipse(430, 590, 100, 250);//the outer sweater arm

    pop();
}

    //Finishing the hair and drawing the bangs
function Drawbangs() {
    push();
    noStroke();
    fill("#957011ff")
    //
    //right bangs
    push();
    translate(365, 190)
    rotate(-55);
    ellipse(0,0,100,170);
    pop();
    //right strands
    push();
    //bezierVertex(x2, y2, x3, y3, x4, y4)

     //Left Bangs
     push();
     translate(275,190);
     rotate(55);
     ellipse(0, 0, 100, 175);
     pop();
     //right strand
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
/** */

