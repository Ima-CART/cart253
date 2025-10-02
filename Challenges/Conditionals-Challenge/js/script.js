/**
 * Scoring a hockey goal
 * Ima Williams
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000",
}

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000",
};

const Target ={
   x: 350,
   y: 200,
   size: 150,
   fill: "#183ba6ff", //blue to start
   fills:{ noOverlap:  "#183ba6ff", //blue for no overlap
         overlap: "#4db9efff", //light blue for overlap
   }



}
/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  movePuck();
  // Draw the user and puck
  drawTarget();
  drawUser();
  drawPuck();
  checkTarget();
}


//moving the puck by overlap
function movePuck(){

  const d=dist(puck.x, puck.y, user.x, user.y,);
  

  //Pushing the puck on the right side
  const mouseoverlap = (d< puck.size/2 + user.size/2);


// Asssuming you already have the overlap check
if (mouseoverlap) {
  // If the user is to the left
  if (user.x < puck.x) {
    // Push left
    puck.x = puck.x + 5;
  }
  // Or if the user to the right
  else if (user.x > puck.x) {
    // Push right
    puck.x = puck.x - 5;
  }
  // Or if the user is above
  if (user.y < puck.y) {
    // Push down
    puck.y = puck.y + 5;
  }
  // Or if the user is below
  else if (user.y > puck.y) {
    // Push up
    puck.y = puck.y - 5;
  }
}



}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

// Check overlap






/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

/**
 *  Display the target
 */
function drawTarget(){
push();
noStroke();
fill(Target.fill);
ellipse(Target.x, Target.y, Target.size);
pop();



}

//changing the target when puck overlaps
function checkTarget() {
  //repeating the same distance but this time using the target
 const d=dist(puck.x, puck.y, Target.x, Target.y,);
const Targetoverlap = (d< puck.size/2 + Target.size/2);

//When you score a goal the goal light up

if (Targetoverlap){ Target.fill=Target.fills.overlap}

//no goal means no light
  else {Target.fill=Target.fills.noOverlap}


}

