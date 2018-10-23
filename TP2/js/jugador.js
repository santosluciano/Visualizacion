function Jugador(nombre,color,fichas,x,y) {
  this.nombre = nombre;
  this.color = color;
  this.turno = false;
  this.ctx = document.getElementById("canvas").getContext("2d");
  this.cantidadFichas = fichas;
  this.ficha = false;
  this.posX = x;
  this.posY = y;

  Jugador.prototype.asignarTurno = function () {
    this.turno = true;
    document.getElementById("turno").innerHTML = "TURNO DE "+this.nombre;
  }
  Jugador.prototype.tieneTurno = function () {
    return this.turno;
  }
  Jugador.prototype.sacarTurno = function () {
    this.turno = false;
  }
  Jugador.prototype.getColor = function () {
    return this.color;
  }
  Jugador.prototype.setFicha = function () {
    if (this.cantidadFichas>0){
      this.ficha = new Ficha(this.posX,this.posY,30,this.color,this.ctx);
      this.cantidadFichas--;
    }
    this.ficha.dibujar();
  }
  Jugador.prototype.getCantidadFichas = function () {
    return this.cantidadFichas+1;
  }
  Jugador.prototype.getFicha = function () {
    return this.ficha;
  }
  Jugador.prototype.getNombre = function () {
    return this.nombre;
  }
}
