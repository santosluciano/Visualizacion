function Juego(param = {}) {
  this.width = 840;
  this.height = 650;
  this.activo = false;
  this.elem = document.getElementById(param.id);
  this.auto = new Auto({left:330,bottom:30,idauto:"automovil"});

  Juego.prototype.comenzar = function () {
    if (this.activo)
      this.resetear();
    else {
      document.getElementById("jugar").innerHTML = "Abandonar";
      this.elem.classList.add("animacion-fondo");
      this.activo = true;
      this.configurarControles();
    }
  }
  Juego.prototype.resetear = function () {
    document.getElementById("jugar").innerHTML = "Jugar";
    this.elem.classList.remove("animacion-fondo");
    this.activo = false;
  }
  Juego.prototype.configurarControles = function() {
    let elem = this.auto;
    document.addEventListener("keydown", function(event){
      let tecla = event.keyCode;
      //costados
      if (tecla == 39)
        elem.derecha();
      else if (tecla == 37)
        elem.izquierda();
      //arriba-abajo
      if (tecla == 38)
        elem.arriba();
      else if (tecla == 40)
        elem.abajo();
    });
    document.addEventListener("keyup", function(event){
      elem.removerClases();
    });
  }
}
