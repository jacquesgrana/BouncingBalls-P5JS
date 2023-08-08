/**
 * classe qui affiche un slider et qui renvoie une valeur (réelle) située entre minVal et maxVal, selon la position de la poignée
 */

class Slider {

  /*
  Constructeur
   posI : position horizontale du slider
   posJ : position verticale du slider
   sizeI : largeur du slider en pixels
   sizeJ : hauteur du slider en pixels
   gapI : ecart de détection en pixels pour permettre d'obtenir facilement la valeur min ou la valeur max quand la poignée arrive aux extrémités
   minVal : minimum de la valeur à renvoyer
   maxVal : maximum de la valeur à renvoyer
   startX : valeur de départ de la valeur à renvoyer, positionne la poignée à la bonne position
   handleWidth : largeur de la poignée en pixels (int)
   sliderBgColor : couleur de fond du slider (color)
   handleBgColor : couleur de fond de la poignée (color)
   strokeColor : couleur du contour (color)
   strokeColorMouseOver : couleur de contour allumé (color)
   handleStkColor : couleur du contour de la poignée (color)
   sliderStkColor : couleur du contour du slider (color)
   valToReturn : valeur à retourner
   */
  constructor(posI, posJ, sizeI, sizeJ, handleWidth, minVal, maxVal, startX,
    sliderBgColor, handleBgColor, strokeColor, strokeColorMouseOver) {
    this.posI = posI;
    this.posJ = posJ;
    this.sizeI = sizeI;
    this.sizeJ = sizeJ;
    this.gapI = 5;
    this.handleWidth = handleWidth;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.startX = startX;
    this.handleHeight = sizeJ + 20;
    this.sliderBgColor = sliderBgColor;
    this.handleBgColor = handleBgColor;
    this.strokeColor = strokeColor;
    this.strokeColorMouseOver = strokeColorMouseOver;
    this.valToReturn = startX;
  }

  /**
   Procédure d'initialisation
   */
  init() {
    this.handleStkColor = this.strokeColor;
    this.sliderStkColor = this.strokeColor;
  }
  
  /**
  Procédure qui dessine le slider selon ses propriétés
  */
  drawSlider() {
    // dessin du slider
    strokeWeight(1);
    stroke(this.sliderStkColor);
    fill(this.sliderBgColor);
    rect(this.posI, this.posJ, this.sizeI, this.sizeJ, 8);
    // calcul de la position de la poignée
    let handlePosI = map(this.valToReturn, this.minVal, this.maxVal, this.posI, this.posI + this.sizeI);
    // dessin de la poignée
    stroke(this.handleStkColor);
    fill(this.handleBgColor);
    rect(handlePosI - this.handleWidth/2, this.posJ - (this.handleHeight - this.sizeJ)/2, this.handleWidth, this.handleHeight, 6);
  }

  /**
  Procédure qui active l'écoute des evenements de la souris dans le slider
  */
  run() {
    // gestion de la souris
    if (mouseX > (this.posI - this.gapI) && mouseX < (this.posI + this.sizeI + this.gapI)) {
      if (mouseY > this.posJ && mouseY < this.posJ + this.sizeJ) {
        this.sliderStkColor = this.strokeColorMouseOver;
        this.handleStkColor = this.strokeColorMouseOver;
        if (mouseIsPressed) {
          this.valToReturn = map(mouseX, this.posI, this.posI + this.sizeI, this.minVal, this.maxVal);
          if (this.valToReturn < this.minVal) {
            this.valToReturn = this.minVal;
          } else if (this.valToReturn > this.maxVal) {
            this.valToReturn = this.maxVal;
          }
          this.handleStkColor = this.strokeColorMouseOver;
          this.sliderStkColor = this.strokeColor;
        }
      } else {
        this.sliderStkColor = this.strokeColor;
        this.handleStkColor = this.strokeColor;
      }
    }
    return this.valToReturn;
  }

  /**
   Setters
   */
  setStartX(startX) {
    this.startX = startX;
  }

  setValToReturn(valToReturn) {
    this.valToReturn = valToReturn;
  }
}
