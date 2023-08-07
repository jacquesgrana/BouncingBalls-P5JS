/**
Classe  qui représente l'objet Ball
*/
class Ball {
  
  /**
  Constructeur
  radius : rayon de la balle en pixel
  strokeWidth : épaisseur du contour de la balle en pixel
  posI : position horizontale dans la fenêtre en pixel
  posJ :  position verticale dans la fenêtre en pixel
  fillColor : couleur de remplissage de la balle (objet color)
  strokeColor : couleur du contour de la balle (objet color)
  isToDraw : vrai si la balle doit être dessinée, faux sinon
  */
  constructor(id, radius, strokeWidth, posI, posJ, vi, vj, ai, aj, fillColor, strokeColor, isToDraw) {
    this.id = id;
    this.radius = radius;
    this.strokeWidth = strokeWidth;
    this.posI = posI;
    this.posJ = posJ;
    this.vi = vi;
    this.vj = vj;
    this.ai = ai;
    this.aj = aj;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.isToDraw = isToDraw;
  }

  /**
  Méthode qui affiche la balle selon ses attributs.
  */
  drawBall() {
    if (this.isToDraw) {
      strokeWeight(this.strokeWidth);
      fill(this.fillColor);
      stroke(this.strokeColor);
      ellipse(this.posI, this.posJ, this.radius*2, this.radius*2);
    }
  }
  
  getRandomDir() {
   return (int) (random(360));
  }
  
  animate() {
    /*
    const random = this.getRandomDir();
    const di = 20*cos(2*Math.PI*random/360);
    const dj = 20*sin(2*Math.PI*random/360);
    this.posI = this.posI + di;
    this.posJ = this.posJ + dj;
    */
    // TODO modifier valeurs initiales qd click
 
    this.ai = gi - frot * this.vi; 
    this.aj = gj - frot * this.vj;
    
    
    
  }
  
  calculatePos() {
   this.vi = this.vi + this.ai * dt;
    this.vj = this.vj + this.aj * dt;
    
    this.posI = this.posI + this.vi * dt;
    this.posJ = this.posJ + this.vj * dt;
    
    this.handleBorders(); 
  }
  
  handleBorders() {
   if(this.posI < this.radius) {
    this.vi = -1 * this.vi;
    this.posI = this.radius;
   }
   
   if(this.posJ < this.radius) {
    this.vj = -1 * this.vj;
    this.posJ = this.radius;
   }
   
   if(this.posI > deltaI - this.radius) {
    this.vi = -1 * this.vi;
    this.posI = deltaI - this.radius;
   }
   
   if(this.posJ > deltaJ - this.radius) {
    this.vj = -1 * this.vj;
    this.posJ = deltaJ - this.radius;    
   }
   
   
  }

  
}
