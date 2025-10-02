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
        background(143, 234, 255);
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
    fill("#ffff");
    rect(180, 450, 280, 250,80)
    fill("#000")
    //fill("#f1f5ffff")
    ellipse(320, 460, 85, 65)
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
arc(320,320,25,30,170,185)
pop();
}



//drawing the mouth
function Drawmouth(){
    //drawing the upperlip
    push();
    fill("#6e3313ff");
    noStroke();
    arc(315,365, 40, 20, 154, 270.1);
    arc(330,365, 40, 20, 154, 270.1);
    
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
    //rect(180, 455, 120, 250,)
   //Left side hoodie
    ellipse(240, 570, 120, 250)//the inner sweater
    ellipse(210, 590, 100, 250)//the outer sweater arm

   //Right side hoodie
    ellipse(400, 570, 120, 250)//the inner sweater
    ellipse(430, 590, 100, 250)//the outer sweater arm




    pop();


}
}
//**" */

