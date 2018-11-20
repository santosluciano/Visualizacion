$(document).ready(function () {
  $('.carousel').carousel('pause');
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
  $('tr').click( function() {
    window.location = $(this).attr('title');
  });
});
