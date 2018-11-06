function Juego(param = {}) {
  this.width = 840;
  this.height = 650;
  this.activo = false;
  this.elem = document.getElementById(param.id);
  this.auto = new Auto({left:330,bottom:30,idauto:"automovil"});
  this.intervalo = null;
  this.invervaloChequeo = null;
  this.intervaloPuntaje = null;
  this.rival = null;
  this.botonJugar = document.getElementById("jugar");
  this.audioambiente = new Audio("audio/partida.mp3");
  this.audioambiente.loop = true;
  this.audioexplosion = new Audio("audio/choque.mp3");
  this.puntajeActualDOM = document.getElementById("puntaje");
  this.puntajeActual = 0;
  this.mejorPuntaje = 0;
  this.mejorPuntajeDOM = document.getElementById("mejorpuntaje");
  this.informacion = document.getElementById("alerta");
  this.perdiste = false;

  Juego.prototype.comenzar = function () {
    if (this.activo)
      this.resetear();
    else {
      this.botonJugar.innerHTML = "Abandonar";
      this.perdiste = false;
      this.auto.activarAuto();
      this.auto.setPosicion(330,30);
      this.botonJugar.classList.remove("btn-primary");
      this.botonJugar.classList.add("btn-danger");
      this.elem.classList.add("animacion-fondo");
      this.activo = true;
      let rival = document.createElement('div');
      rival.setAttribute("id", "rival");
      this.elem.append(rival);
      this.informacion.innerHTML = "";
      this.configurarControles();
      this.setEnemigos();
      this.chequearColisiones();
      this.setPuntaje();
      this.audioambiente.play();
    }
  }
  Juego.prototype.setPuntaje = function () {
    this.intervaloPuntaje = setInterval(() => {
      this.puntajeActual += 100;
      this.puntajeActualDOM.innerHTML = this.puntajeActual;}
      ,1000);
  }
  Juego.prototype.setEnemigos = function () {
      this.intervalo = setInterval(() => {
        this.rival = document.getElementById("rival");
        this.rival.classList.toggle("mover-rival");
        this.rival.style.left = this.anchoRandom()+"px"; }
        , 3500);
  }
  Juego.prototype.chequearColisiones = function () {
    this.intervaloChequeo = setInterval(() => {
      this.rival = document.getElementById("rival");
      let rect = this.rival.getBoundingClientRect();
      let datosrival = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
      }
      let datosauto = this.auto.ubicacion();
      if (datosrival.top < datosauto.top+100 && datosrival.top > datosauto.top-100){
        if (datosrival.right < datosauto.right+44 && datosrival.left > datosauto.left-44){
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
    this.perdiste = true;
    this.informacion.innerHTML = "Perdiste!!!!";
    this.audioexplosion.play();
    this.audioambiente.pause();
    this.rival.classList.remove("mover-rival");
    this.botonJugar.classList.remove("btn-danger");
    this.botonJugar.classList.add("btn-success");
    this.botonJugar.innerHTML = "Volver a jugar";
    clearInterval(this.intervaloPuntaje);
  }
  Juego.prototype.anchoRandom = function () {
      return Math.random() * (645 - 150) + 150;
  }
  Juego.prototype.resetear = function () {
    if (this.perdiste == false)
      this.informacion.innerHTML = "Abandonaste!!!!";
    if (this.mejorPuntaje < this.puntajeActual){
      this.mejorPuntaje = this.puntajeActual;
      this.mejorPuntajeDOM.innerHTML = this.puntajeActual;
      this.informacion.innerHTML = "Nuevo record!!!";
    }
    this.puntajeActual = 0;
    this.puntajeActualDOM.innerHTML = this.puntajeActual;
    document.getElementById("jugar").innerHTML = "Jugar";
    this.elem.classList.remove("animacion-fondo");
    this.rival.classList.remove("mover-rival");
    this.auto.resetear();
    this.audioambiente.pause();
    this.audioambiente.currentTime = 0;
    this.activo = false;
    clearInterval(this.intervaloChequeo);
    clearInterval(this.intervalo);
    clearInterval(this.intervaloPuntaje);
    this.botonJugar.classList.remove("btn-danger");
    this.botonJugar.classList.remove("btn-success");
    this.botonJugar.classList.add("btn-primary");
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
