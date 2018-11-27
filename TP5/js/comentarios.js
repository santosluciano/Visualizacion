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
      let html = '';
      for (var i = 0; i < 3; i++) {
    
        html += '<div class="container">';
        html += '<div class="media comment-box">';
        html += '<div class="media-left">';
        html += '<img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">'              
        html += '</div>';
        html += '<div class="media-body">';
        html += '<h4 class="media-heading">'+json[i].email+'</h4>';
        html += '<p>'+json[i].body+'</p>';                               
        html += '</div></div></div>';    
      }
      let jqHTML = $(html);
      $(".contenedor-comentarios").html('').append(jqHTML);
    
    }

});
