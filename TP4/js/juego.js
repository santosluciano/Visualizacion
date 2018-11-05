function Juego(param = {}) {
  this.width = 840;
  this.height = 650;
  this.activo = false;
  this.elem = document.getElementById(param.id);
  this.auto = new Auto({left:330,bottom:30,idauto:"automovil"});
  this.intervalo = null;
  this.invervaloChequeo = null;
  this.rival = document.getElementById("rival");
  this.botonJugar = document.getElementById("jugar");

  Juego.prototype.comenzar = function () {
    if (this.activo)
      this.resetear();
    else {
      this.botonJugar.innerHTML = "Abandonar";
      this.elem.classList.add("animacion-fondo");
      this.activo = true;
      this.configurarControles();
      this.setEnemigos();
      this.chequearColisiones();
    }
  }
  Juego.prototype.setEnemigos = function () {
      this.intervalo = setInterval(() => {
        this.rival.classList.toggle("mover-rival");
        this.rival.style.left = this.anchoRandom()+"px"; }
        , 3500);
  }
  Juego.prototype.chequearColisiones = function () {
    this.intervaloChequeo = setInterval(() => {
      let rect = this.rival.getBoundingClientRect();
      let datosrival = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
      }
      let datosauto = this.auto.ubicacion();
      if (datosrival.top < datosauto.top+100 && datosrival.top > datosauto.top-100){
        if (datosrival.right < datosauto.right+50 && datosrival.left > datosauto.left-50){
          this.auto.explotar();
          this.elem.classList.remove('animacion-fondo');
          this.juegoPerdido();
        }
      }
    }, 100);
  }
  Juego.prototype.juegoPerdido = function () {
    clearInterval(this.intervaloChequeo);
    clearInterval(this.intervalo);
    this.rival.removeAttribute('id');
  }
  Juego.prototype.anchoRandom = function () {
      return Math.random() * (645 - 150) + 150;
  }
  Juego.prototype.resetear = function () {
    document.getElementById("jugar").innerHTML = "Jugar";
    this.elem.classList.remove("animacion-fondo");
    this.activo = false;
  }
  Juego.prototype.configurarControles = function() {
    document.addEventListener("keydown", (event) => {
      let tecla = event.keyCode;
      //costados
      if (tecla == 39)
        this.auto.derecha();
      else if (tecla == 37)
        this.auto.izquierda();
      //arriba-abajo
      if (tecla == 38)
        this.auto.arriba();
      else if (tecla == 40)
        this.auto.abajo();
    });
    document.addEventListener("keyup", (event) => {
      this.auto.removerClases();
    });
  }
}
