

//Neste .js poñemos codigos que usan todas as páxinas da web. Noutros casos é mellor diferenciar
// para qe as paxinas non carguen código que non usan.  


// Pezas comuns en varias páxinas. Importar dende o script e ligar co ID
    fetch('paxina_fervenza/pezas/nav.html')
        .then(respuesta => respuesta.text())
        .then(codigoHtml => {
            // Cuando lo tenga, lo mete dentro de nuestro hueco
            document.getElementById('contenedor-menu').innerHTML = codigoHtml;
        });

    fetch('paxina_fervenza/pezas/pe.html')
        .then(respuesta => respuesta.text())
        .then(codigoHtml => {
            // Cuando lo tenga, lo mete dentro de nuestro hueco
            document.getElementById('contenedor-footer').innerHTML = codigoHtml;
        });

    fetch('paxina_fervenza/pezas/lateral.html')
        .then(respuesta => respuesta.text())
        .then(codigoHtml => {
            // Cuando lo tenga, lo mete dentro de nuestro hueco
            document.getElementById('barra-lateral').innerHTML = codigoHtml;
        });



