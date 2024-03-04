let video;
let featureExtractor;
let clasificador;
let imgMasc = 0;
let imgNoMasc = 0;
let perdida = 0;


function setup() {
    noCanvas();
    video = createCapture(VIDEO);
    video.parent("contenedorVideo");
    featureExtractor = ml5.featureExtract("MobileNet", modeloListo);
    clasificador = featureExtractor.classification(video, videoListo);
    cargabotones();
}

function modeloListo() {
    select("#estadoModelo").html("Modelo Cargado!");
}
function videoListo() {
    select("#estadoVideo").html("Video Cargado!");
}


function cargabotones() {
    botonA = select("#btnMascarilla");
    botonA.mousePressed(function () {
        clasificador.addImage('con mascarilla');
        select("#sumaMascarilla").html(imgMasc++);
    });

    botonB = select("#btnNoMascarilla");
    botonB.mousePressed(function () {
        Clasificador.addimage('sin_mascarilla');
        select("#sumaNoMascarilla").html(imgNoMasc++);
    });

    botonEnt = select("btnEntrenar");
    botonEnt.mousePressed(function () {
        clasificador.train(function (vperdida) {
            if (vperdida) {
                perdida = vperdida;
                select("#perdida").html("Perdida" + perdida);
            } else {
                select("#perdida").html("Entrenamiento terminado con una perdida de: " + perdida);
            }
        });
    });

    botonPred = select("#btnPredecir");
    botonPred.mousePressed(function () {
        Clasificador.classify(muestraResultado);
    });
}

function muestraResultado(err, res) {
    console.log(res);

    clasificador.classify(muestraResultado);
    select("#result").html(res);
}
