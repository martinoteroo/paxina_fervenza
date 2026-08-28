// Enlace del Excel de las revistas
const enlaceRevistas = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkokWtVHinODMmAKEijRegdjck9r7vRvGiY_LKIHa2xBSNfNNM2iGLvQ96gK87Co1c_UhvxiRkLgCv/pub?output=csv";

Papa.parse(enlaceRevistas, {
    download: true,
    header: true,
    complete: function(resultados) {
        // 1. Filtramos las válidas
        let revistasValidas = resultados.data.filter(revista => revista.Titulo && revista.Titulo.trim() !== "");
        
        // 2. Las invertimos para que las nuevas estén primero
        let revistasInvertidas = revistasValidas.reverse(); 
        
        // 3. ¡Magia! Nos quedamos únicamente con las primeras 3
        let revistasNuevas = revistasInvertidas.slice(0, 3);
        
        let cajaRevistas = document.getElementById("contenedor-revistas");
        let contenidoHTML = "";

        revistasNuevas.forEach(function(revista) {
            // target="_blank" hace que el PDF se abra en una pestaña nueva
            contenidoHTML += `
                <article class="tarjeta-revista">
                     <a href="${revista.PDF}" target="_blank" class="enlace-tarjeta-entera">
                    <img src="${revista.Portada}" alt="Portada de la revista">
                    <h3>${revista.Titulo}</h3>
                    <p>Edición: ${revista.Mes}</p>
                   </a>
                </article>
            `;
        });

        cajaRevistas.innerHTML = contenidoHTML;
    }
});