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
