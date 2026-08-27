

//Neste .js poñemos codigos que usan todas as páxinas da web. Noutros casos é mellor diferenciar
// para qe as paxinas non carguen código que non usan.  


// Le pedimos al navegador que busque el archivo menu.html
    fetch('../pezas/nav.html')
        .then(respuesta => respuesta.text())
        .then(codigoHtml => {
            // Cuando lo tenga, lo mete dentro de nuestro hueco
            document.getElementById('contenedor-menu').innerHTML = codigoHtml;
        });