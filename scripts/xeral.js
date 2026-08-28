

//solucion para problema de rutas relativas en localhost y en servidor
let RUTA_BASE = "";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    RUTA_BASE = "/"; 
} else {
    RUTA_BASE = "/paxina_fervenza/"; 
}


//Neste .js poñemos codigos que usan todas as páxinas da web. Noutros casos é mellor diferenciar
// para qe as paxinas non carguen código que non usan.  


// Pezas comuns en varias páxinas. Importar dende o script e ligar co ID
    fetch(RUTA_BASE+`pezas/nav.html`)
        .then(respuesta => respuesta.text())
        .then(datos => {
        // La traducción: cambiamos el comodín por la ruta real
        let htmlCorregido = datos.replaceAll("{RAIZ}", RUTA_BASE);
        document.getElementById("contenedor-menu").innerHTML = htmlCorregido;
    });

    fetch(RUTA_BASE+'pezas/pe.html')
        .then(respuesta => respuesta.text())
        .then(datos => {
        // La traducción: cambiamos el comodín por la ruta real
        let htmlCorregido = datos.replaceAll("{RAIZ}", RUTA_BASE);
        document.getElementById("contenedor-footer").innerHTML = htmlCorregido;
    });

    fetch(RUTA_BASE+'pezas/lateral.html')
        .then(respuesta => respuesta.text())
        .then(datos => {
        // La traducción: cambiamos el comodín por la ruta real
        let htmlCorregido = datos.replaceAll("{RAIZ}", RUTA_BASE);
        document.getElementById("barra-lateral").innerHTML = htmlCorregido;
    });
        



