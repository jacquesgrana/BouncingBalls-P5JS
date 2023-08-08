  /**
  Variables globales de l'application
  */
  var deltaI = window.innerWidth;
  var deltaJ = window.innerHeight;
  var radius = 2;
  var dt = 0.1;
  var gi = 0;
  var gj = 0;
  var frot = 0.1;
  //var g = Math.sqrt(gi*gi + gj*gj);
  var g = 20;
  var dens = 1;
  
  var backGroundColor;
  var ballStrokeColor;
  var lightBackGroundColor;
  var fillColor;
  var hoverColor;
  var strokeColor;
  var textColor;
  
  /**
  Procédure qui définie les couleurs de l'application
  */
  function initColors() {
     backGroundColor = color(0);
     ballStrokeColor = color(0);
     lightBackGroundColor = color(50,50,50);
     fillColor = color(255,100,0);
     hoverColor = color(200,100,0);
     strokeColor = color(230,230,230);
     textColor = color(240,240,240);
  }
