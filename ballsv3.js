var app;
var mouseStartX;
var mouseStartY;
var mouseEndX;
var mouseEndY;

function setup() {
  app = new App();
  app.init();
}


function draw() {
  app.run();
  if(mouseIsPressed === true) {
    //console.log('appuis souris');
    if(mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ) {
      app.drawBallIndicator(mouseStartX, mouseStartY, mouseX, mouseY);
    }
  }
}

function mousePressed() {
   mouseStartX = mouseX;
   mouseStartY = mouseY;
}

function mouseReleased() {
  mouseEndX = mouseX;
  mouseEndY = mouseY;
  app.addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY);
}
