function Ficha(x,y,radio,color,ctx) {
  this.x = x;
  this.y = y;
  this.radio = radio;
  this.color = color;
  this.ctx = ctx;
  this.habilitada = true;
  this.seleccionada = false;

  Ficha.prototype.dibujar = function () {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x,this.y,this.radio, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
  Ficha.prototype.mover = function (x,y,tablero,ficha2) {
    if (this.isHabilitada()){
      this.ctx.clearRect(0, 0, canvas.width,canvas.height);
      tablero.dibujar();
      this.x = x;
      this.y = y;
      ficha2.dibujar();
      this.dibujar();
    }
  }
  Ficha.prototype.isSeleccionada = function (){
    return this.seleccionada;
  }
  Ficha.prototype.seleccionar = function (){
    this.seleccionada = true;
  }
  Ficha.prototype.deseleccionar = function () {
    this.seleccionada = false;
  };
  Ficha.prototype.isClick = function (xM,yM) {
    let x = xM - this.x;
    let y = yM - this.y;
    return (Math.sqrt(x*x + y*y) < (this.radio*2));
  }
  Ficha.prototype.isHabilitada = function () {
    return this.habilitada;
  }
  Ficha.prototype.habilitar = function () {
    this.habilitada = true;
  }
  Ficha.prototype.deshabilitar = function () {
    this.habilitada = false;
  }
}
