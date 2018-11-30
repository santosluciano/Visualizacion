$(document).ready(function(){
    let i = 0;
    getComentarios();
    function getComentarios() {
        fetch('https://my-json-server.typicode.com/santosluciano/Visualizacion/comentarios')
        .then(response => response.json())
        .then(function (json) {
            mostrarComentarios(json);
        });  
    }
    function mostrarComentarios(json) {
      $(".contenedor-comentarios").html("");
      let html = '';
      for (i; i <4; i++) {
        html += '<div class="container contenedor-comentario"><div class="media comment-box"><div class="media-left">';
        html += '<img class="img-responsive user-photo" src="images/usuario.png"></div><div class="media-body">'              
        html += '<h4 class="media-heading">'+json[i].usuario+'<span class="fas fa-heart corazon animacion-dislike">'+json[i].likes+'</span></h4>';
        html += '<p>'+json[i].comentario+'</p>';                               
        html += '</div></div></div>';    
      }
      let comHTML = $(html);
      $(".contenedor-comentarios").html('').append(comHTML); 
      let intervalo = setInterval(() => {
        mostrarNuevoComentario(json);
        if (i==16){
            clearInterval(intervalo);
        }
       },4000);
    }
    function mostrarNuevoComentario(json){
        $('.contenedor-comentario').last().remove();
        let html = '';
        html += '<div class="container contenedor-comentario"><div class="media comment-box"><div class="media-left">';
        html += '<img class="img-responsive user-photo" src="images/usuario.png"></div><div class="media-body">'              
        html += '<h4 class="media-heading">'+json[i].usuario+'<span class="fas fa-heart corazon animacion-dislike">'+json[i].likes+'</span></h4>';
        html += '<p>'+json[i].comentario+'</p>';                               
        html += '</div></div></div>';   
        i++;
        $(".contenedor-comentarios").prepend(html); 
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
});
