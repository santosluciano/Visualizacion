function Juego(param = {}) {
  this.width = 840;
  this.height = 650;
  this.activo = false;
  this.elem = document.getElementById(param.id);
  this.auto = new Auto({left:330,bottom:30,idauto:"automovil"});
  this.intervalo = null;
  this.invervaloChequeo = null;
  this.intervaloPuntaje = null;
  this.invervaloGasolina = null;
  this.rival = null;
  this.gasolina = null;
  this.botonJugar = document.getElementById("jugar");
  this.audioambiente = new Audio("audio/partida.mp3");
  this.audioambiente.loop = true;
  this.audioexplosion = new Audio("audio/choque.mp3");
  this.puntajeActualDOM = document.getElementById("puntaje");
  this.puntajeActual = 0;
  this.mejorPuntaje = 0;
  this.mejorPuntajeDOM = document.getElementById("mejorpuntaje");
  this.gasolinaPuntaje = 0;
  this.gasolinaDOM = document.getElementById("cantidadgasolina");
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
      this.gasolinaPuntaje = 1500;
      this.gasolinaDOM.innerHTML = this.gasolinaPuntaje;
      this.botonJugar.classList.remove("btn-primary");
      this.botonJugar.classList.add("btn-danger");
      this.elem.classList.add("animacion-fondo");
      this.activo = true;
      let rival = document.createElement('div');
      rival.setAttribute("id", "rival");
      this.elem.append(rival);
      let gasolina = document.createElement('div');
      gasolina.setAttribute("id", "gasolina");
      this.elem.append(gasolina);
      this.informacion.innerHTML = "";
      this.configurarControles();
      this.setEnemigos();
      this.setGasolina();
      this.chequearColisiones();
      this.setPuntaje();
      this.audioambiente.play();
    }
  }
  Juego.prototype.setPuntaje = function () {
    this.intervaloPuntaje = setInterval(() => {
      this.puntajeActual += 100;
      this.gasolinaPuntaje -= 50;
      this.gasolinaDOM.innerHTML = this.gasolinaPuntaje;
      this.puntajeActualDOM.innerHTML = this.puntajeActual;
      if (this.gasolinaPuntaje <= 200){
        this.gasolinaDOM.classList.remove("badge-light");
        this.gasolinaDOM.classList.add("badge-warning");
      }
      if (this.gasolinaPuntaje <= 0) {
        this.gasolinaDOM.classList.remove("badge-warning");
        this.gasolinaDOM.classList.add("badge-danger");
        this.auto.resetear();
        this.juegoPerdido();
      }
    },1000);
  }
  Juego.prototype.setEnemigos = function () {
      this.intervalo = setInterval(() => {
        this.rival = document.getElementById("rival");
        this.rival.classList.toggle("mover-rival");
        this.rival.style.left = this.anchoRandom()+"px"; }
        , 3500);
  }
  Juego.prototype.setGasolina = function () {
    this.intervaloGasolina = setInterval(() => {
      this.gasolina = document.getElementById("gasolina");
      this.gasolina.classList.remove("agarrar-gasolina");
      this.gasolina.classList.toggle("mover-gasolina");
      this.gasolina.style.left = this.anchoRandom()+"px"; }
      , 5000);
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
      this.gasolina = document.getElementById("gasolina");
      let rectgasolina = this.gasolina.getBoundingClientRect();
      let datosgasolina = {
          top: rectgasolina.top,
          bottom: rectgasolina.bottom,
          left: rectgasolina.left,
          right: rectgasolina.right
      }
      let datosauto = this.auto.ubicacion();
      if (datosrival.top < datosauto.top+100 && datosrival.top > datosauto.top-100){
        if (datosrival.right < datosauto.right+44 && datosrival.left > datosauto.left-44){
          this.auto.explotar();
          this.elem.classList.remove('animacion-fondo');
          this.juegoPerdido();
        }
      }
      if (datosgasolina.top < datosauto.top+100 && datosgasolina.top > datosauto.top-100){
        if (datosgasolina.right < datosauto.right+44 && datosgasolina.left > datosauto.left-44){
          this.recogerGasolina(datosgasolina.bottom, datosgasolina.left);
        }
      }
    }, 100);
  }
  Juego.prototype.recogerGasolina = function (bottom,left) {
    if (this.gasolinaPuntaje <= 200){
      this.gasolinaDOM.classList.remove("badge-warning");
      this.gasolinaDOM.classList.add("badge-light");
    }
    this.gasolinaPuntaje += 300;
    this.puntajeActual += 200;
    this.puntajeActualDOM.innerHTML = this.puntajeActual;
    this.gasolina.classList.remove("mover-gasolina");
    this.gasolinaDOM.innerHTML = this.gasolinaPuntaje;
  }
  Juego.prototype.juegoPerdido = function () {
    clearInterval(this.intervaloChequeo);
    clearInterval(this.intervalo);
    clearInterval(this.intervaloGasolina);
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
    this.gasolinaDOM.classList.remove("badge-danger");
    this.gasolinaDOM.classList.remove("badge-warning");
    this.gasolinaDOM.classList.add("badge-light");
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
    clearInterval(this.intervaloGasolina);
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
