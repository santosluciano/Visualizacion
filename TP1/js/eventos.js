let paint = new Paint(document.getElementById("canvas").getContext("2d"));
let seBajoMouse = false;

document.getElementById("textogrosor").append("Lapiz");
document.getElementById("grosor").value = 1;
//hace que cuando se refresque la pagina se ponga el pincel en negro
document.getElementById('color').value = "0,0,0";

document.getElementById("goma").addEventListener('click', function(event) {
  document.getElementById("textogrosor").innerHTML = "Goma";
  paint.setGoma(this);
});
document.getElementById("lapiz").addEventListener('click', function(event) {
  document.getElementById("textogrosor").innerHTML = "Lapiz";
  paint.setLapiz(this);
});
document.getElementById("canvas").addEventListener('mousemove', function(event) {
  paint.dibujarLinea(event);
  seBajoMouse = true;
});
document.getElementById("canvas").addEventListener('mousedown', function(event){
    paint.restablecerPunto();
    seBajoMouse = false;
    paint.addEstado();
});
document.getElementById("canvas").addEventListener('click', function(event) {
  if (!seBajoMouse)
    paint.dibujarPunto(event);
});
document.getElementById('grosor').addEventListener('change', function(e){
  if (this.value != 0)
    paint.setearGrosorLinea(this.value);
  else
    paint.setearGrosorLinea(1);
});
document.getElementById('tacho').addEventListener('click', function(e){
    paint.removerEstados();
    paint.clearCanvas();
});
document.getElementById('deshacer').addEventListener('click', function(e){
  paint.deshacer();
});
document.getElementById('cargar').addEventListener('change', function(e){
  paint.cargarImagen(e);
  paint.addEstado();
});
document.getElementById('descargar').addEventListener('click', function(e){
  alertify.prompt("Descargar imagen","Ingrese el nombre de la imagen", "Canvas",
    function(e, value ){
      paint.descargarImagen(value);
    },
    function(){
      alertify.error('Descarga cancelada');
    }).set('labels', {ok:'Descargar', cancel:'Cancelar'});
});
document.getElementById('sepia').addEventListener('click', function(e){
  paint.sepia();
  paint.addEstado();
});
document.getElementById('byn').addEventListener('click', function(e){
  paint.blancoNegro();
  paint.addEstado();
});
document.getElementById('negativo').addEventListener('click', function(e){
  paint.negativo();
  paint.addEstado();
});
document.getElementById('color').addEventListener('change', function(e){
  let rgb = this.value;
  rgb = rgb.split(',');
  paint.setearColor(rgb[0],rgb[1],rgb[2]);
});
document.getElementById('contraste').addEventListener('click', function(e) {
  paint.contraste(document.getElementById('valorContraste').value);
});
