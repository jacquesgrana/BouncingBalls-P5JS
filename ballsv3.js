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
    if (mouseButton === LEFT) {
      if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
        app.drawNewBallIndicator(mouseStartX, mouseStartY, mouseX, mouseY);
      }
    }
    //console.log('appuis souris');
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
      mouseStartX = mouseX;
      mouseStartY = mouseY;
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT) {
    if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
      mouseEndX = mouseX;
      mouseEndY = mouseY;
      app.addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY);
    }
  } else if (mouseButton === RIGHT) {
    console.log('clic droit !!');
    app.checkClickToDelete(mouseX, mouseY);
  }
}
