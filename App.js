class App {
  constructor() {
    this.balls = [];
    this.cpt = 0;
    this.sliderGI = null;
    this.sliderGJ = null;
    this.sliderDens = null;
    this.sliderFrot = null;
    this.buttonDelete = null;
    this.buttonReset = null;
  }

  /**
   * Fonction d'initialisation
   */
  init() {
    initColors();
    const canvas = createCanvas(deltaI, deltaJ);
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault());
    background(lightBackGroundColor);
    this.buttonDelete = new Button(deltaI - 240, deltaJ - settingsHeight + 25, 100, 30, "Delete", lightBackGroundColor, textColor, textColor, hoverColor, hoverColor, backGroundColor, true);
    this.buttonReset = new Button(deltaI - 125, deltaJ - settingsHeight + 25, 100, 30, "Reset", lightBackGroundColor, textColor, textColor, hoverColor, hoverColor, backGroundColor, true);
    this.sliderGI = new Slider(25, deltaJ - settingsHeight + 90, deltaI/2 - 50, 20, 10, -10, 10, gi,
      lightBackGroundColor, lightBackGroundColor, textColor, hoverColor);
    this.sliderGJ = new Slider(deltaI/2, deltaJ - settingsHeight + 90, deltaI/2 - 25, 20, 10, -10, 10, gi,
      lightBackGroundColor, lightBackGroundColor, textColor, hoverColor);
    this.sliderDens = new Slider(25, deltaJ - settingsHeight + 160, deltaI/2 - 50, 20, 10, 0.01, 4, dens,
      lightBackGroundColor, lightBackGroundColor, textColor, hoverColor);
    this.sliderFrot = new Slider(deltaI/2, deltaJ - settingsHeight + 160, deltaI/2 - 25, 20, 10, 0, 1, frot,
      lightBackGroundColor, lightBackGroundColor, textColor, hoverColor);
    this.sliderGI.init();
    this.sliderGJ.init();
    this.sliderDens.init();
    this.sliderFrot.init();
  }

  /**
   * Fonction principale qui affiche les balles et, si demandé, les réglages.
   */
  run() {
    this.clearCanvas();
    if (this.balls.length > 0) {
      this.balls.forEach(b => {
        if (b.isToDraw) {
          b.calculateAcc();
          this.handleAttraction(b, this.balls);
          this.handleColls(b, this.balls);
          b.calculatePos();
          b.drawBall();
        }
      }
      );
    }
    if (isRenderSettings) {
      this.renderSettings();
      if (this.buttonReset.getIsClicked()) {
        this.resetValues();
      }
      if (this.buttonDelete.getIsClicked()) {
        this.deleteBalls();
      }
    } else {
      this.renderHelp();
    }
  }

  /**
   * Fonction qui efface le canvas
   */
  clearCanvas() {
    background(lightBackGroundColor);
  }

  /**
   * Fonction qui efface le tableau balls et reset le compteur qui sert d'index.
   */
  deleteBalls() {
    this.balls = [];
    this.cpt = 0;
  }

  /**
   * Fonction qui remet les valeurs par défaut des paramètres suivis.
   */
  resetValues() {
    gi = 0;
    gj = 0;
    frot = 0.1;
    dens = 1;
    this.sliderGI.setValToReturn(gi);
    this.sliderGJ.setValToReturn(gj);
    this.sliderDens.setValToReturn(dens);
    this.sliderFrot.setValToReturn(frot);
  }

  /**
   * Fonction qui crée une nouvelle balle de couleur aléatoire et dont la vitesse est proportionnelle
   * à la longueur du glissé de la souris et qui l'ajoute dans le tableau balls.
   */
  addNewBall(mouseStartX, mouseStartY, mouseEndX, mouseEndY) {
    if (!isRenderSettings || isRenderSettings && mouseEndY < (deltaJ - settingsHeight)) {
      if (!this.checkIfClickInOrNearBall(mouseStartX, mouseStartY, this.balls)) {
        const vi = (mouseEndX - mouseStartX) * 0.5;
        const vj = (mouseEndY - mouseStartY) * 0.5;
        const red = (int) (random(51));
        const green =(int) (random(51));
        const blue = (int) (random(101));
        const col = color(100 + red, 30 + green, 155 + blue);
        //const radius = (int) (random(26)) + 15;
        const ball = new Ball(this.cpt, radius, 1, mouseStartX, mouseStartY, vi, vj, 0, 6, col, strokeColor, true);
        this.cpt++;
        //ball.addEventListener("click", this.clickBall);
        this.balls.push(ball);
      }
    }
  }

/**
* Fonction qui vérifie si le clic n'est pas trop près d'une balle.
* Renvoie true si le clic est trop près.
*/
  checkIfClickInOrNearBall(mouseI, mouseJ, balls) {
    let toReturn = false;
    balls.forEach(b => {
      const di = b.posI - mouseI;
      const dj = b.posJ - mouseJ;
      // calculer distance click - ball
      const dist = sqrt(di*di + dj*dj);
      // si distance < b.radius
      if (dist <= b.radius + radius) {
        toReturn |= true;
      } else {
        toReturn |= false;
      }
    }
    );
    return toReturn;
  }


/**
* Fonction qui vérifie si le clic (droit) est dans une balle et, si oui, supprime la balle concernée.
*/
  checkClickToDelete(mouseI, mouseJ) {
    // pour chaque balle de balls

    let ballToDelete = null;
    this.balls.forEach(b => {
      const di = b.posI - mouseI;
      const dj = b.posJ - mouseJ;
      // calculer distance click - ball
      const dist = sqrt(di*di + dj*dj);
      // si distance < b.radius
      if (dist <= b.radius) {
        // effacer balle de balls
        //console.log('clic dans ball : id :', b.id);
        ballToDelete = b;
      }
    }
    );
    if (ballToDelete !== null) {
      this.balls = this.balls.filter(b => b.id !== ballToDelete.id);
      ballToDelete = null;
    }
  }

  /**
  * Fonction qui gère les collisions entre la balle ball et le tableau balls
  */
  handleColls(ball, balls) {
    if (balls.length > 1) {
      balls.filter(b => b.id !== ball.id).forEach(b => {
        // Calcul des distances entre les centres des balles
        const di = ball.posI - b.posI;
        const dj = ball.posJ - b.posJ;
        const dist = Math.sqrt(di * di + dj * dj);

        // Vérifie si les balles se chevauchent
        if (dist < (ball.radius + b.radius)) {

          // Calcul des masses des balles
          const mBall = PI * dens * ball.radius * ball.radius;
          const mB = PI * dens * b.radius * b.radius;

          // Calcul des composantes x et y du vecteur direction entre les balles
          const dx = b.posI - ball.posI;
          const dy = b.posJ - ball.posJ;

          // Calcul de l'angle entre les balles
          const angle = Math.atan2(dy, dx);

          // Calcul des composantes x et y du vecteur unitaire normal et tangent
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          // Calcul des composantes normales et tangentielles des vitesses
          const v1n = cos * ball.vi + sin * ball.vj;
          const v1t = -sin * ball.vi + cos * ball.vj;

          const v2n = cos * b.vi + sin * b.vj;
          const v2t = -sin * b.vi + cos * b.vj;

          // Calcul des nouvelles vitesses normales après collision
          const newV1n = ((mBall - mB) * v1n + 2 * mB * v2n) / (mBall + mB);
          const newV2n = ((mB - mBall) * v2n + 2 * mBall * v1n) / (mBall + mB);

          // Conversion des nouvelles vitesses normales en composantes x et y
          const newV1nx = newV1n * cos;
          const newV1ny = newV1n * sin;

          const newV2nx = newV2n * cos;
          const newV2ny = newV2n * sin;

          // Calcul des nouvelles vitesses tangentielles (inchangées)
          const newV1t = v1t;
          const newV2t = v2t;

          // Calcul des nouvelles vitesses finales après collision
          ball.vi = newV1nx - newV1t * sin;
          ball.vj = newV1ny + newV1t * cos;

          b.vi = newV2nx - newV2t * sin;
          b.vj = newV2ny + newV2t * cos;

          // Calcul du déplacement pour éviter la superposition
          const overlap = ball.radius + b.radius - dist;
          const moveX = (overlap / dist) * di * 0.5;
          const moveY = (overlap / dist) * dj * 0.5;

          // Appliquer les déplacements aux positions des balles
          ball.posI += moveX;
          ball.posJ += moveY;

          b.posI -= moveX;
          b.posJ -= moveY;
        }
      }
      );
    }
  }


/**
* Fonction qui gère la force d'attraction générée par balls sur la balle ball et affecte l'accélération de ball.
*/
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

/**
* Fonction qui dessine l'indicateur de direction et de vitesse avant de créer une nouvelle balle.
*/
  drawNewBallIndicator(startX, startY, posX, posY) {
    //console.log('appel fonction drawBallIndicator');
    if (!this.checkIfClickInOrNearBall(startX, startY, this.balls)) {
      this.drawStartBall(startX, startY, radius);
      strokeWeight(2);
      stroke(hoverColor);
      line(startX, startY, posX, posY);
      fill(hoverColor);
      ellipse(posX, posY, 10, 10);
    }
  }

/**
* Fonction qui dessine le contour de la nouvelle balle avant de la créer.
*/
  drawStartBall(startX, startY, radius) {
    strokeWeight(2);
    stroke(hoverColor);
    noFill();
    ellipse(startX, startY, radius*2, radius*2);
  }

/**
* Fonction qui affiche le texte de l'aide en bas de la fenêtre.
*/
  renderHelp() {
    fill(hoverColor);
    noStroke();
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('Display settings : type [S] or [s] • left click and drag to create a new ball • right click on a ball to delete it', 25, deltaJ - 20);
  }

/**
* Fonction qui les réglages qui permettent de modifier ai et aj, les composantes horizontale 
* et verticale de la pesanteur, dens, la densité des balles qui les rend plus ou moins attractives 
* et frot, le frottement/résistance du milieu.
*/
  renderSettings() {
    //console.log('render settings');
    strokeWeight(1);
    stroke(hoverColor);
    fill(backGroundColor);

    rect(1, deltaJ - settingsHeight, deltaI - 1, settingsHeight);
    fill(hoverColor);
    noStroke();
    textSize(32);
    textAlign(LEFT, TOP);
    text('Settings', 25, deltaJ - settingsHeight + 20);

    fill(hoverColor);
    textSize(14);
    textAlign(LEFT, TOP);

    text('Gravity on the horizontal axis : ' + gi, 25, deltaJ - settingsHeight + 65);
    text('Gravity on the vertical axis : ' + gj, deltaI/2, deltaJ - settingsHeight + 65);
    text('Balls weight : ' + dens, 25, deltaJ - settingsHeight + 135);
    text('Friction : ' + frot, deltaI/2, deltaJ - settingsHeight + 135);
    this.sliderGI.drawSlider();
    gi = this.sliderGI.run();
    this.sliderGJ.drawSlider();
    gj = this.sliderGJ.run();
    this.sliderDens.drawSlider();
    dens = this.sliderDens.run();
    this.sliderFrot.drawSlider();
    frot = this.sliderFrot.run();
    this.buttonReset.drawButton();
    this.buttonReset.run();
    this.buttonDelete.drawButton();
    this.buttonDelete.run();
  }
}
