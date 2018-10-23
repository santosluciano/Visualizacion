//JSON de config
let config = {
  "activo":"lapiz",
  "r":0,
  "g":0,
  "b":0,
  "grosorLinea":document.getElementById("grosor").value,
  "offx":325,
  "offy":80
}

class Paint {
  constructor(contexto) {
    this.ctx = contexto;
    this.puntoanterior = new Punto(-1,-1);
    this.ultimoestado = [];
    this.rellenarCanvas();
  }
  //configuracion
  getRed(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+0];
  }
  getGreen(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+1];
  }
  getBlue(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+2];
  }
  getTransparency(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+3];
  }
  getEstadoCanvas(){
      return this.ctx.getImageData(0,0,canvas.width,canvas.height);
  }
  setEstadoCanvas(estado){
      this.ctx.putImageData(estado, 0, 0);
  }
  setearColor(r,g,b){
    config.r = r;
    config.g = g;
    config.b = b;
  }
  rellenarCanvas(){
    let imageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
    for (let x=0; x<canvas.width; x++){
      for (let y=0; y<canvas.height; y++){
          this.setPixel(imageData,x,y,255,255,255,255);
      }
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
  //herramientas
  setGoma(elem){
    config.activo = "goma";
    this.eliminarActivos();
    elem.classList.add('activo');
    document.getElementById("canvas").style.cursor = 'url("images/goma.png"),default';
  }
  setLapiz(elem){
    config.activo = "lapiz";
    config.grosorLinea = document.getElementById("grosor").value;
    this.eliminarActivos();
    elem.classList.add('activo');
    document.getElementById("canvas").style.cursor = "url('images/lapiz.png'),auto";
  }
  //Comportamientos
  eliminarActivos(){
    let elemento = document.getElementsByClassName("activo");
    for (let e of elemento){
      e.classList.remove('activo');
    }
  }
  dibujarLinea(e){
    if (e.buttons == 1){
      let x = e.clientX-config.offx;
      let y = e.clientY-config.offy;
      if  (this.puntoanterior.existe()){
        this.ctx.lineWidth = config.grosorLinea;
        this.ctx.lineCap = "round";
        if (config.activo == "lapiz")
          this.ctx.strokeStyle = "rgb("+config.r+","+config.g+","+config.b+")"; //funcion para poner el color
        else if (config.activo == "goma")
          this.ctx.strokeStyle = "rgb(255,255,255)";
        this.ctx.beginPath(); //empezar a dibujar
        this.ctx.moveTo(this.puntoanterior.getX(),this.puntoanterior.getY()); //me muevo al punto anterior
        this.ctx.lineTo(x,y); //dibujo la linea a donde esta ahora
        this.ctx.stroke(); //dibujo
        this.ctx.closePath();
      }
      this.puntoanterior.setX(x);
      this.puntoanterior.setY(y);
    }
  }
  dibujarPunto(e){
    let x = e.clientX-config.offx;
    let y = e.clientY-config.offy;
    // Estableciendo el color negro para rellenar después
    this.ctx.fillStyle = "rgb("+config.r+","+config.g+","+config.b+")";
    // Se crea un rectángulo de 1x1 en el centro del canvas
    this.ctx.lineWidth = config.grosorLinea;
    this.ctx.lineCap = "round";
    if (config.activo == "lapiz")
      this.ctx.strokeStyle = "rgb("+config.r+","+config.g+","+config.b+")"; //funcion para poner el color
    else if (config.activo == "goma")
      this.ctx.strokeStyle = "rgb(255,255,255)";
    this.ctx.beginPath(); //empezar a dibujar
    this.ctx.moveTo(x,y); //me muevo al punto anterior
    this.ctx.lineTo(x,y); //dibujo la linea a donde esta ahora
    this.ctx.stroke(); //dibujo
    this.ctx.closePath();
    //let imageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
    //this.setPixel(imageData, x, y, config.r, config.g, config.b, 255);
    //this.ctx.putImageData(imageData, 0, 0);
  }
  restablecerPunto(){
    this.puntoanterior.empty();
  }
  setPixel(imageData, x, y, r, g, b, a) {
    let index = (x+y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
  }
  clearCanvas(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.rellenarCanvas();
  }
  cargarImagen(e){
    this.clearCanvas();
    let reader = new FileReader();
    let context = this.ctx;
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            let width = img.width;
            let height = img.height;
            while (width>canvas.width || height > canvas.height){
              width = width/2;
              height = height/2;
            }
            let posicionX = (canvas.width - width)/2;
            let posicionY = (canvas.height - height)/2;
            context.drawImage(img,posicionX,posicionY,width,height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  descargarImagen(nombreImagen){
    nombreImagen+=".png";
    let link = window.document.createElement( 'a' );
    let url = canvas.toDataURL();
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', nombreImagen );
    link.style.visibility = 'hidden';
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
  }
  deshacer(){
    if (this.ultimoestado.length > 0)
      this.setEstadoCanvas(this.ultimoestado.pop());
  }
  addEstado() {
    if (this.ultimoestado.length < 5)
      this.ultimoestado.push(this.getEstadoCanvas());
    else {
      this.ultimoestado.shift();
      this.ultimoestado.push(this.getEstadoCanvas());
    }
  }
  removerEstados(){
    this.ultimoestado = [];
  }
  //filtros
  sepia(){
    let imageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
    let r,g,b;
    for (let x=0; x<canvas.width; x++){
      for (let y=0; y<canvas.height; y++){
          r = (this.getRed(imageData,x,y) * 0.393) + (this.getGreen(imageData,x,y)*0.769) + (this.getBlue(imageData,x,y) * 0.189);
          g = (this.getRed(imageData,x,y) * 0.349) + (this.getGreen(imageData,x,y)*0.686) + (this.getBlue(imageData,x,y) * 0.168);
          b = (this.getRed(imageData,x,y) * 0.272) + (this.getGreen(imageData,x,y)*0.534) + (this.getBlue(imageData,x,y) * 0.131);
          this.setPixel(imageData, x, y, r, g, b,255);
      }
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
  blancoNegro(){
    let imageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
    let r,g,b;
    for (let x=0; x<canvas.width; x++){
      for (let y=0; y<canvas.height; y++){
        r = this.getRed(imageData,x,y);
        g = this.getGreen(imageData,x,y);
        b = this.getBlue(imageData,x,y);
        let gris = (r+g+b)/3;
        this.setPixel(imageData, x, y, gris, gris, gris,255);
      }
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
  negativo(){
    let imageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
    let r,g,b;
    for (let x=0; x<canvas.width; x++){
      for (let y=0; y<canvas.height; y++){
        r = 255 - this.getRed(imageData,x,y);
        g = 255 - this.getGreen(imageData,x,y);
        b = 255 - this.getBlue(imageData,x,y);
        this.setPixel(imageData, x, y, r, g, b,255);
      }
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
  contraste(variacion){
    variacion = parseInt(variacion);
    let imageData = this.ctx.getImageData(0,0,canvas.width,canvas.height);
    let factor = (259 * (variacion + 255)) / (255 * (259 - variacion));
    let r,g,b;
    for (let x=0; x<canvas.width; x++){
      for (let y=0; y<canvas.height; y++){
        r = factor * (this.getRed(imageData,x,y) - 128) + 128;
        g = factor * (this.getGreen(imageData,x,y) - 128) + 128;
        b = factor * (this.getBlue(imageData,x,y) - 128) + 128;
        this.setPixel(imageData, x, y, r, g, b,255);
      }
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
  //configuracion
  setearGrosorLinea(valor){
    config.grosorLinea = valor;
  }
}
