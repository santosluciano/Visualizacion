function Auto(param = {}) {
  this.left = param.left;
  this.bottom = param.bottom;
  this.elem = document.getElementById(param.idauto);

  Auto.prototype.derecha = function () {
    if (this.left < 645){
      let clase = this.elem.classList;
      this.left += 4;
      this.elem.style.left = this.left+"px";
      if (!clase.contains("derecha"))
        clase.add("derecha");
    }
  }
  Auto.prototype.izquierda = function () {
    if (this.left > 150){
      let clase = this.elem.classList;
      this.left -= 4;
      this.elem.style.left = this.left+"px";
      if (!clase.contains("izquierda"))
        clase.add("izquierda");
    }
  }
  Auto.prototype.arriba = function () {
    this.bottom += 8;
    this.elem.style.bottom = this.bottom+"px";
  }
  Auto.prototype.abajo = function () {
    this.bottom -= 8;
    this.elem.style.bottom = this.bottom+"px";
  }
  Auto.prototype.removerClases = function () {
    let clase = this.elem.classList;
    clase.remove("derecha");
    clase.remove("izquierda");
  }
}
