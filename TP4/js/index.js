let juego = new Juego({id:"juego"});

document.getElementById('jugar').addEventListener("click", function () {
    juego.comenzar();    
});

$('.dropdown-juegos').on("mouseover",function(){
    $(this).dropdown('toggle');
  });
  $('.dropdown-juegos').on('click',function(){
    window.location = 'https://santosluciano.github.io/Visualizacion/TP5/todoslosjuegos.html';
  });
