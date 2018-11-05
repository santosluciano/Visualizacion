function Auto(param = {}) {
  this.left = param.left;
  this.bottom = param.bottom;
  this.elem = document.getElementById(param.idauto);
  this.activo = true;

  Auto.prototype.derecha = function () {
    if (this.left < 645 && this.activo){
      let clase = this.elem.classList;
      this.left += 8;
      this.elem.style.left = this.left+"px";
      if (!clase.contains("derecha"))
        clase.add("derecha");
    }
  }
  Auto.prototype.izquierda = function () {
    if (this.left > 150 && this.activo){
      let clase = this.elem.classList;
      this.left -= 8;
      this.elem.style.left = this.left+"px";
      if (!clase.contains("izquierda"))
        clase.add("izquierda");
    }
  }
  Auto.prototype.ubicacion = function () {
    let rect = this.elem.getBoundingClientRect();
    return datos = {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right
    }
  }
  Auto.prototype.explotar = function () {
    this.elem.classList.add("explosion");
    this.activo = false;
  }
  Auto.prototype.arriba = function () {
    if (this.activo){
      this.bottom += 12;
      this.elem.style.bottom = this.bottom+"px";
    }
  }
  Auto.prototype.abajo = function () {
    if (this.activo){
      this.bottom -= 12;
      this.elem.style.bottom = this.bottom+"px";
    }
  }
  Auto.prototype.removerClases = function () {
    let clase = this.elem.classList;
    clase.remove("derecha");
    clase.remove("izquierda");
  }
}
