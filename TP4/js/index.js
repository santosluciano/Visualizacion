let juego = new Juego({id:"juego"});

document.getElementById('jugar').addEventListener("click", function () {
    juego.comenzar();
});
