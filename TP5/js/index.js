$(document).ready(function () {
  /*Hover sobre los item del costado del carousel*/
  $('.btncarousel').hover(function(event) {
    event.preventDefault();
    let id = $(this).attr("id");
    $('.btncarousel').removeClass("mini-activo");
    $(this).addClass("mini-activo");
    $('.carousel-item').removeClass("active");
    if (id == "img1")
      $('#imagencarousel1').addClass("active");
    else if ((id == "img2"))
      $('#imagencarousel2').addClass("active");
    else if ((id == "img3"))
      $('#imagencarousel3').addClass("active");
    else if ((id == "img4"))
      $('#imagencarousel4').addClass("active");
  });
  /*click en la tabla de mas jugados y mejores valorados*/
  $('.tr-click').click( function() {
    window.location = $(this).attr('title');
  });
  //accion al hacer click en login
  $('.login').on('click', function(event){
    event.preventDefault();
    window.location = "index-log.html";
  });
  $('.dropdown-juegos').on("mouseover",function(){
    $(this).dropdown('toggle');
  });
  $('.dropdown-juegos').on('click',function(){
    window.location = 'todoslosjuegos.html';
  });
  //cancela el autodeslizante del carousel
  $('.carousel.slide').carousel({ interval: false }); 
  $('.flecha-infinito').on('click',function(){
    $('.item-infinito.active').addClass('stand');
    $('.item-infinito.active').removeClass('active');
    $('.item-infinito.inactive').addClass('active');
    $('.item-infinito.inactive').removeClass('inactive');
    $('.item-infinito.stand').addClass('inactive');
    $('.item-infinito.stand').removeClass('stand');
  });
  $('.flecha-jugados').on('click',function(){
    $('.item-jugados.active').addClass('stand');
    $('.item-jugados.active').removeClass('active');
    $('.item-jugados.inactive').addClass('active');
    $('.item-jugados.inactive').removeClass('inactive');
    $('.item-jugados.stand').addClass('inactive');
    $('.item-jugados.stand').removeClass('stand');
  });
});
