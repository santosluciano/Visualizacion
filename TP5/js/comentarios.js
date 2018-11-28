$(document).ready(function(){
    let i = 30;
    getComentarios();
    function getComentarios() {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(function (json) {
            mostrarComentarios(json);
        });  
    }
    function mostrarComentarios(json) {
      $(".contenedor-comentarios").html("");
      let html = '';
      for (i; i <33; i++) {
        html += '<div class="container"><div class="media comment-box"><div class="media-left">';
        html += '<img class="img-responsive user-photo" src="images/usuario.png"></div><div class="media-body">'              
        html += '<h4 class="media-heading">'+json[i].email+'<span class="fas fa-heart corazon animacion-dislike">'+calcularLikes()+'</span></h4>';
        html += '<p>'+json[i].body+'</p>';                               
        html += '</div></div></div>';    
      }
      let comHTML = $(html);
      $(".contenedor-comentarios").html('').append(comHTML); 
    }
    $(document).on('click','.animacion-dislike',function(){
        $(this).removeClass('animacion-dislike');
        $(this).addClass('animacion-corazon');
        let mg = $(this).html();
        mg = parseInt(mg);
        $(this).html(mg+1);
    });    
    $(document).on('click','.animacion-corazon',function(){
        $(this).removeClass('animacion-corazon');
        $(this).addClass('animacion-dislike');
        let mg = $(this).html();
        mg = parseInt(mg);
        $(this).html(mg-1);
    });    
    function calcularLikes(){
        return Math.floor(Math.random() * (99 - 0)) + 0;
    }
});
