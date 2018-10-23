function Juego(jugador1,jugador2) {
  this.ctx = document.getElementById("canvas").getContext("2d");
  this.tablero = new Tablero(235,80,6,7,30);
  this.jugador1 = jugador1;
  this.jugador2 = jugador2;

  Juego.prototype.iniciarJuego = function(){
    this.tablero.dibujar();
    this.jugador1.setFicha();
    this.jugador2.setFicha();
    document.getElementById("jugador1").innerHTML = this.jugador1.getNombre();
    document.getElementById("jugador2").innerHTML = this.jugador2.getNombre();
    document.getElementById("fichasj1").innerHTML = this.jugador1.getCantidadFichas();
    document.getElementById("fichasj2").innerHTML = this.jugador2.getCantidadFichas();
    this.jugador1.asignarTurno();
  }
  Juego.prototype.clickFicha = function (e) {
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    if (this.jugador1.tieneTurno()){
      jugadorActivo = this.jugador1;
      jugadorInactivo = this.jugador2;
    } else {
      jugadorActivo = this.jugador2;
      jugadorInactivo = this.jugador1;
    }
    let ficha,ficha2;
    ficha = jugadorActivo.getFicha();
    ficha2 = jugadorInactivo.getFicha();
    if (ficha.isSeleccionada()){
      ficha.deseleccionar();
      if (this.tablero.detectarPosicion(x,y,ficha,this.tablero,jugadorActivo,ficha2)){
        jugadorActivo.setFicha();
        document.getElementById("fichasj1").innerHTML = this.jugador1.getCantidadFichas();
        document.getElementById("fichasj2").innerHTML = this.jugador2.getCantidadFichas();
        jugadorInactivo.asignarTurno();
        jugadorActivo.sacarTurno();
      }
    }else{
      if (ficha.isClick(x,y)){
        ficha.seleccionar();
        ficha.mover(x,y,this.tablero,ficha2);
      }
    }
  }
  Juego.prototype.movimientoFicha = function (e) {
    let x = e.layerX - e.currentTarget.offsetLeft;
    let y = e.layerY - e.currentTarget.offsetTop;
    if (this.jugador1.tieneTurno()){
      jugadorActivo = this.jugador1;
      jugadorInactivo = this.jugador2;
    } else {
      jugadorActivo = this.jugador2;
      jugadorInactivo = this.jugador1;
    }
    ficha = jugadorActivo.getFicha();
    ficha2 = jugadorInactivo.getFicha();
    if (ficha.isSeleccionada()){
      this.tablero.dibujar();
      ficha.mover(x,y,this.tablero,ficha2);
    }
  }
  Juego.prototype.finJuego = function () {
    let ficha = this.jugador1.getFicha();
    if (!ficha.isSeleccionada()){
      let ganador = this.tablero.hayGanador();
      if (ganador){
        if (this.jugador1.getColor() === ganador){
          alertify.alert(this.jugador1.getNombre()+" GANO LA PARTIDA!!!", function(){
              alertify.success('NUEVA PARTIDA');
              location.reload();
          }).setting({'label':"REINICIAR"});
        } else if (this.jugador2.getColor() === ganador){
          alertify.alert(this.jugador2.getNombre()+" GANO LA PARTIDA!!!", function(){
              alertify.success('NUEVA PARTIDA');
              location.reload();
          }).setting({'label':"REINICIAR"});
        }
    }
    if (this.jugador1.getCantidadFichas() === 0 && this.jugador2.getCantidadFichas() === 0){
      alertify.alert("TERMINO EL JUEGO, NO HAY GANADOR!!", function(){
          alertify.success('NUEVA PARTIDA');
          location.reload();
      }).setting({'label':"REINICIAR"});
    }
  }
}
}
