class App {
  constructor() {
    this.balls = [];
    this.cpt = 0;
  }

  init() {
    createCanvas(deltaI, deltaJ);
    background(50);
    initColors();
    this.initBalls();
  }

  initBalls() {
    /*
    const ball1 = new Ball(0, 20, 1, deltaI/2, 50, 7, 0, 0, 5, fillColor, strokeColor, true);
    this.balls.push(ball1);
    const ball2 = new Ball(1, 20, 1, deltaI/2 -50, 50, 5, 0, 0, 5, fillColor, strokeColor, true);
    this.balls.push(ball2);
    const ball3 = new Ball(2, 20, 1, deltaI/2 +50, 50, -2, 0, 0, 5, fillColor, strokeColor, true);
    this.balls.push(ball3);
    const ball4 = new Ball(3, 20, 1, deltaI/2 + 100, 50, 3, 0, 0, 5, fillColor, strokeColor, true);
    this.balls.push(ball4);
    */
  }

  clearCanvas() {
    background(50);
  }

  run() {
    this.clearCanvas();
    this.balls.forEach(b => {
      if (b.isToDraw) {
        this.handleColls(b, this.balls);
        b.animate();
        b.drawBall()
      }
    });
    
  }
  
  addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY) {
    const vi = (mouseEndX - mouseStartX) * 0.5;
    const vj = (mouseEndY - mouseStartY) * 0.5;
    const red = (int) (random(256));
    const green =(int) (random(256));
    const blue = (int) (random(256));
    const col = color(red, green, blue);
    const ball = new Ball(this.cpt, 20, 1, mouseEndX, mouseEndY, vi, vj, 0, 6, col, strokeColor, true);
    this.cpt++;
    this.balls.push(ball);
  }

  handleColls(ball, balls) {
    if (balls.length > 1) {
      //console.log('plus de balls que 1');
      balls.filter(b => b.id !== ball.id).forEach(b => {
        const di = ball.posI - b.posI;
        const dj = ball.posJ - b.posJ;
        const dist = Math.sqrt(di*di+dj*dj);
        if (dist < (ball.radius + b.radius)) {
          //console.log('collision entre ball n°' + ball.id + ' et ball n°' + b.id);

          const dx = b.posI - ball.posI;
          const dy = b.posJ - ball.posJ;
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Calcul des composantes normales et tangentielles des vitesses
          const v1n = cos * ball.vi + sin * ball.vj;
          const v1t = -sin * ball.vi + cos * ball.vj;

          const v2n = cos * b.vi + sin * b.vj;
          const v2t = -sin * b.vi + cos * b.vj;

          // Calcul des nouvelles vitesses normales après collision
          const newV1n = ((ball.radius - b.radius) * v1n + 2 * b.radius * v2n) / (ball.radius + b.radius);
          const newV2n = ((b.radius - ball.radius) * v2n + 2 * ball.radius * v1n) / (ball.radius + b.radius);

          // Conversion des nouvelles vitesses normales en composantes x et y
          const newV1nx = newV1n * cos;
          const newV1ny = newV1n * sin;

          const newV2nx = newV2n * cos;
          const newV2ny = newV2n * sin;

          // Calcul des nouvelles vitesses tangentielles (inchangées)
          const newV1t = v1t;
          const newV2t = v2t;

          // Calcul des nouvelles vitesses finales
          ball.vi = newV1nx - newV1t * sin;
          ball.vj = newV1ny + newV1t * cos;

          b.vi = newV2nx - newV2t * sin;
          b.vj = newV2ny + newV2t * cos;


          // Calcule la nouvelle position pour éviter la superposition
          const overlap = ball.radius + b.radius - dist;
          const moveX = (overlap / dist) * di * 0.5;
          const moveY = (overlap / dist) * dj * 0.5;

          ball.posI += moveX;
          ball.posJ += moveY;

          b.posI -= moveX;
          b.posJ -= moveY;

          /*
        // Inverse les vitesses pour simuler la réflexion
           const tempVi = ball.vi;
           const tempVj = ball.vj;
           
           ball.vi = b.vi;
           ball.vj = b.vj;
           
           b.vi = tempVi;
           b.vj = tempVj;
           */
        }
      }
      );
    }
  }
}
