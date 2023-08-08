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
        b.animate();
        this.handleAttraction(b, this.balls);
        this.handleColls(b, this.balls);
        b.calculatePos();
        b.drawBall();
      }
    }
    );
  }

  addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY) {
    const vi = (mouseEndX - mouseStartX) * 0.5;
    const vj = (mouseEndY - mouseStartY) * 0.5;
    const red = (int) (random(256));
    const green =(int) (random(256));
    const blue = (int) (random(256));
    const col = color(red, green, blue);
    //const radius = (int) (random(26)) + 15;
    const radius = 35;
    const ball = new Ball(this.cpt, radius, 1, mouseStartX, mouseStartY, vi, vj, 0, 6, col, strokeColor, true);
    this.cpt++;
    this.balls.push(ball);
  }

  handleColls(ball, balls) {
    if (balls.length > 1) {
      balls.filter(b => b.id !== ball.id).forEach(b => {
        const di = ball.posI - b.posI;
        const dj = ball.posJ - b.posJ;
        const dist = Math.sqrt(di * di + dj * dj);

        if (dist < (ball.radius + b.radius)) {

          
          

          const mBall = PI * dens * ball.radius * ball.radius;
          const mB = PI * dens * b.radius * b.radius;

          const dx = b.posI - ball.posI;
          const dy = b.posJ - ball.posJ;
          const angle = Math.atan2(dy, dx);
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const v1n = cos * ball.vi + sin * ball.vj;
          const v1t = -sin * ball.vi + cos * ball.vj;

          const v2n = cos * b.vi + sin * b.vj;
          const v2t = -sin * b.vi + cos * b.vj;

          const newV1n = ((mBall - mB) * v1n + 2 * mB * v2n) / (mBall + mB);
          const newV2n = ((mB - mBall) * v2n + 2 * mBall * v1n) / (mBall + mB);

          const newV1nx = newV1n * cos;
          const newV1ny = newV1n * sin;

          const newV2nx = newV2n * cos;
          const newV2ny = newV2n * sin;

          const newV1t = v1t;
          const newV2t = v2t;

          ball.vi = newV1nx - newV1t * sin;
          ball.vj = newV1ny + newV1t * cos;

          b.vi = newV2nx - newV2t * sin;
          b.vj = newV2ny + newV2t * cos;

          const overlap = ball.radius + b.radius - dist;
          const moveX = (overlap / dist) * di * 0.5;
          const moveY = (overlap / dist) * dj * 0.5;
          
          ball.posI += moveX;
          b.posI -= moveX;
          ball.posJ += moveY;
          b.posJ -= moveY;
        }
      }
      );
    }
  }

  handleAttraction(ball, balls) {
    //console.log('handle attraction');
    if (balls.length > 1) {
      //console.log('plus de balls que 1');
      balls.filter(b => b.id !== ball.id).forEach(b => {
        //console.log('handle attraction');

        const mBall = PI * dens * ball.radius * ball.radius;
        const mB = PI * dens * b.radius * b.radius;
        const di = b.posI - ball.posI;
        const dj = b.posJ - ball.posJ;
        const d = sqrt(di * di + dj * dj);
        const f = (g * mB * mBall) / (d * d);
        const cos = di / d;
        const sin = dj / d;
        const accI = (f / mBall) * cos;
        //console.log('accI :', accI);
        const accJ = (f / mBall) * sin;
        //console.log('accJ :', accJ);
        ball.ai += accI;
        ball.aj += accJ;
      }
      );
    }
  }
}
