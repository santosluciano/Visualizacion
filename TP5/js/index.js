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
    let pass = $('#pass');
    let mail = $('#mail');
    let alerta = $('.alerta-login');
    if (pass.val()=="admin" && mail.val()=="admin"){
      pass.removeClass("error-input");
      mail.removeClass("error-input");
      alerta.removeClass("active");
      $('.login-loading').html('<i class="fas fa-circle-notch fa-spin fa-2x"></i>');
      setTimeout(function(){window.location = "index-log.html";},2000);0
    }
    else{
      pass.addClass("error-input");
      mail.addClass("error-input");
      alerta.addClass("active");
    }

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
  $('.page-item').on('click',function(event){
    event.preventDefault();
    let label = $(this).find('a').attr("aria-label");
    if (label == 'Next'){
      if ($('.page-item.active').next('li').find('a').attr("aria-label")!='Next'){
        $('.page-item.active').next('li').addClass('prox-active');
        $('.page-item').removeClass('active');
        $('.prox-active').addClass('active');
        $('.prox-active').removeClass('prox-active');
      }
    } else if (label =='Previous'){
      if ($('.page-item.active').prev('li').find('a').attr("aria-label")!='Previous'){
        $('.page-item.active').prev('li').addClass('prox-active');
        $('.page-item').removeClass('active');
        $('.prox-active').addClass('active');
        $('.prox-active').removeClass('prox-active');
      }
    } 
    else{
      $('.page-item').removeClass('active');
      $(this).addClass('active');
    }
  });
  $('.contenedor-juego img').on('click', function(){
    window.location = 'juego.html';
  });
  $('.img-recomendado').on('click', function(){
    window.location = 'juego.html';
  });
  $('.flechaabajo').on('click', function(){
    window.location = 'todoslosjuegos.html';
  });
});
