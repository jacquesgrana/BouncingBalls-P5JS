/**
Classe Button
*/
class Button {
/**
* constructeur
  posI : position horizontale dans la fenêtre en pixel
  posJ : position verticale dans la fenêtre en pixel
  sizeI : taille horizontale en pixel
  sizeJ : taille verticale en pixel
  text : texte affiché dans le bouton (String)
  buttonBgColor : couleur de fond du bouton (color)
  buttonStkColor : couleur du conteur du bouton (color)
  (bgColor : copie de buttonBgColor (color))
  strokeColor : copie de buttonStrokeColor (color)
  strokeColorMouseOver : couleur du bouton quand la souris le survole (color)
  colorDisabled : couleur du bouton quand il est désactivé (color)
  isEnabled : vrai si le bouton est activé, sinon faux (booléen)
  isClicked : vrai si le bouton a été cliqué, faux le reste du temps, sert à déclencher des actions
  */
  constructor(posI, posJ, sizeI, sizeJ, text, buttonBgColor, buttonStkColor, strokeColor, textColor, strokeColorMouseOver, colorDisabled, isEnabled) {
    this.posI = posI;
    this.posJ = posJ;
    this.sizeI = sizeI;
    this.sizeJ = sizeJ;
    this.text = text;
    this.buttonBgColor = buttonBgColor;
    this.bgColor = buttonBgColor;
    this.buttonStkColor = buttonStkColor;
    this.strokeColor = strokeColor;
    this.strokeColorMouseOver = strokeColorMouseOver;
    this.colorDisabled = colorDisabled;
    this.textColor = textColor;
    this.isEnabled = isEnabled;
    this.isClicked = false;
  }

/**
  init() {
  }
*/

  /**
  Procédure qui dessine le bouton selon ses propriétés
  */
  drawButton() {
    strokeWeight(1);
    stroke(this.buttonStkColor);
    fill(this.buttonBgColor);
    rect(this.posI, this.posJ, this.sizeI, this.sizeJ, 8);
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(this.textColor);
    noStroke();
    text(this.text, this.posI + this.sizeI/2, this.posJ + this.sizeJ/2);
    textAlign(LEFT);
    if (this.isEnabled) {
      this.textColor  = this.strokeColor;
    } else {
      this.textColor  = this.colorDisabled;
    }
  }

  /**
  Procédure qui démarre l'écoute du clic
  */
  run() {
    //print("run button");

    if (this.isEnabled) {
      if (mouseX > this.posI && mouseX < (this.posI + this.sizeI)) {
        if (mouseY > this.posJ && mouseY < (this.posJ + this.sizeJ)) {
          this.buttonStkColor = this.strokeColorMouseOver;
          this.textColor = this.strokeColorMouseOver;
          if (mouseIsPressed) { //  mouseIsPressed // mouseup // mouseClicked(change_background)
            this.isClicked = true;
            this.buttonBgColor = this.strokeColorMouseOver;
          }
        }
      } else {
        this.buttonBgColor = this.bgColor;
        this.buttonStkColor = this.strokeColor;
        this.isClicked = false;
      }
    } else {
      this.textColor  = this.colorDisabled;
      this.isClicked = false;
    }
    
    
  }

  /**
  Setters et Getters
  */
  setText(text) {
    this.text = text;
  }

  getText() {
    return this.text;
  }

  setIsEnabled(isEnabled) {
    this.isEnabled = isEnabled;
  }

  getIsEnabled() {
    return this.isEnabled;
  }
  
  setIsClicked(isClicked) {
    this.isClicked = isClicked;
  }

  getIsClicked() {
    return this.isClicked;
  }
/*
  setValToReturn(valToReturn) {
    this.valToReturn = valToReturn;
  }

  getValToReturn() {
    return this.valToReturn;
  }*/
}
