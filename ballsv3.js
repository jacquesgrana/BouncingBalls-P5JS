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
  if (mouseIsPressed === true) {
    //console.log('appuis souris');
    if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
      app.drawNewBallIndicator(mouseStartX, mouseStartY, mouseX, mouseY);
    }
  }
}

function mousePressed() {
  if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
    mouseStartX = mouseX;
    mouseStartY = mouseY;
  }
}

function mouseReleased() {
  if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
    mouseEndX = mouseX;
    mouseEndY = mouseY;
    app.addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY);
  }
}
