// Tu enlace largo del Excel (terminado en pub?output=csv)
    const enlaceExcel = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRV68SLA6ujZ0jgGkiknu16IUsFDcZtter5q1ZGy-8MLMckzSi76WrQMI0Yv_sYOLe5svMvrFLbk7o4/pub?output=csv";

    Papa.parse(enlaceExcel, {
        download: true,
        header: true,
        complete: function(resultados) {
            
            let todasLasNoticias = resultados.data;

            // 1. Limpiamos filas vacías por si dejaste algún hueco en el Excel
            let noticiasValidas = todasLasNoticias.filter(noticia => noticia.Titulo && noticia.Titulo.trim() !== "");

            // 2. Le damos la vuelta para que las de abajo del Excel (las más nuevas) salgan primero
            let noticiasNuevas = noticiasValidas.reverse();

            // 3. Cortamos la lista para quedarnos SOLO con las 3 primeras (Ideal para la portada)
            let ultimasTres = noticiasNuevas.slice(0, 5);

            let cajaPrincipal = document.getElementById("contenedor-principal-noticias");
            let contenidoHTML = "";

            // 4. Dibujamos el HTML por cada noticia
            ultimasTres.forEach(function(noticia) {
                
                // Hacemos un resumen del texto para no saturar la portada (corta a los 220 caracteres)
                let textoResumen = noticia.Texto.substring(0, 250) + "...";

                contenidoHTML += `
                    <article class="tarjeta-noticia">
                        <h3>${noticia.Titulo}</h3>
                        <p><small> ${noticia.Fecha}</small></p>
                        <p>${textoResumen}</p>
                        
                        <!-- MAGIA: El botón apunta a noticia.html pasándole el ID exacto -->
                        <br>
                        <a href="pezas/noticia.html?id=${noticia.ID}" class="btn-principal" style="font-size: 0.9rem; padding: 8px 15px;">Leer comunicado completo</a>
                    </article>
                `;
            });

            // Sustituimos el "Cargando..." por las tarjetas reales
            cajaPrincipal.innerHTML = contenidoHTML;
        }
    });