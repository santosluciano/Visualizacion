function Juego(param = {}) {
  this.width = 840;
  this.height = 650;
  this.activo = false;
  this.elem = document.getElementById(param.id);
  this.auto = new Auto({left:330,bottom:30,idauto:"automovil"});
  this.intervalo = null;

  Juego.prototype.comenzar = function () {
    if (this.activo)
      this.resetear();
    else {
      document.getElementById("jugar").innerHTML = "Abandonar";
      this.elem.classList.add("animacion-fondo");
      this.activo = true;
      this.configurarControles();
      let rival = document.getElementById("rival");
      rival.style.left = this.anchoRandom()+"px";
      rival.classList.toggle("mover-rival");
      setInterval(function(){ rival.classList.toggle("mover-rival");rival.style.left = (Math.random() * (645 - 150) + 150)+"px"; }, 3500);
    }
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
    document.getElementById("juego").addEventListener("animationiteration",function () {
      let rival = document.getElementById("rival");
      let rect = rival.getBoundingClientRect();
      let datosrival = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
      }
      let datosauto = elem.ubicacion();
      if (datosrival.top < datosauto.top+100 && datosrival.top > datosauto.top-100){
        if (datosrival.right < datosauto.right+50 && datosrival.left > datosauto.left-50){
          elem.explotar();
          rival.classList.add('explosion');
        }
      }
    });
  }
}
