$(document).ready(function(){
    getDatos();


    function getDatos() {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(function (json) {
          mostrarDatos(json);
        });  
    }
    
    function mostrarDatos(json) {
      $(".contenedor-comentarios").html("");
      let html = '';
      for (var i = 100; i < 103; i++) {
    
        html += '<div class="container">';
        html += '<div class="media comment-box">';
        html += '<div class="media-left">';
        html += '<img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">'              
        html += '</div>';
        html += '<div class="media-body">';
        html += '<h4 class="media-heading">'+json[i].email+'<span class="fas fa-heart corazon"></span></h4>';
        html += '<p>'+json[i].body+'</p>';                               
        html += '</div></div></div>';    
      }
      let jqHTML = $(html);
      $(".contenedor-comentarios").html('').append(jqHTML);
      $('.corazon').on('click',function(){
        $(this).addClass('animacion');
      });     
      $('.corazon.active').on('click',function(){
        $(this).removeClass('animacion');
        $(this).addClass('animacion-dislike');
      });     
    }



});
