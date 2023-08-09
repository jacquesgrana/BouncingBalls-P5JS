class MouseEvents {
 constructor(app) {
  this.app = app; 
 }
 
 run() {
   if (mouseIsPressed === true) {
    if (mouseButton === LEFT) {
      if (!isRenderSettings && mouseX >= 0 && mouseX <= deltaI && mouseY >= 0 && mouseY <= deltaJ || isRenderSettings && mouseY >= 0 && mouseY <= deltaJ - settingsHeight) {
        this.app.drawNewBallIndicator(mouseStartX, mouseStartY, mouseX, mouseY);
      }
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
      this.app.addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY);
    }
  } else if (mouseButton === RIGHT) {
    console.log('clic droit !!');
    this.app.checkClickToDelete(mouseX, mouseY);
  }
}
}
}
