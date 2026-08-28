// Tu enlace largo del Excel (terminado en pub?output=csv)
    const enlaceExcel = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRV68SLA6ujZ0jgGkiknu16IUsFDcZtter5q1ZGy-8MLMckzSi76WrQMI0Yv_sYOLe5svMvrFLbk7o4/pub?output=csv";

    // Declaramos las variables para controlar el scroll
    let todasLasNoticias = [];  
    let noticiasMostradas = 0;
    const noticiasPorCarga = 6;

    Papa.parse(enlaceExcel, {
        download: true,
        header: true,
        complete: function(resultados) {
            
            // 1. Limpiamos filas vacías por si dejaste algún hueco en el Excel
            let noticiasValidas = resultados.data.filter(noticia => noticia.Titulo && noticia.Titulo.trim() !== "");

            // 2. Le damos la vuelta y lo guardamos en la variable GLOBAL (sin usar 'let' aquí)
            todasLasNoticias = noticiasValidas.reverse();

            // 3. Vaciamos el cargando
            document.getElementById("contenedor-principal-noticias").innerHTML = "";

            // 4. Hacemos la primera carga
            dibujarSiguienteLote();   
        }
    });

    function dibujarSiguienteLote() {
        let cajaPrincipal = document.getElementById("contenedor-principal-noticias");
        
        // Si no hay más noticias que mostrar, paramos la función
        if (noticiasMostradas >= todasLasNoticias.length) return; 

        // Cortamos el lote que toca mostrar
        let lote = todasLasNoticias.slice(noticiasMostradas, noticiasMostradas + noticiasPorCarga); 
        let contenidoHTML = "";

        // Recorremos el lote
        lote.forEach(function(noticia) {
            let textoSeguro = noticia.Texto ? noticia.Texto : "";
            let textoResumen = textoSeguro.substring(0, 300) + "...";

            contenidoHTML += `
                <article class="tarjeta-noticia">
                        <a href="pezas/noticia.html?id=${noticia.ID}" class="enlace-tarjeta-entera1">
                        
                        <div class="contido-noticia">
                            <div class="contenedor-imaxe">
                                <img src="${noticia.Imagen}" alt="Imagen da noticia">
                            </div>
                            <div class="contido-texto">
                                <h3>${noticia.Titulo}</h3>
                                <i><p class="data-publicacion">Publicado o: ${noticia.Fecha}</p></i>
                                <p>${textoResumen}</p>
                            </div>    
                        </div>
                        <!-- MAGIA: El botón apunta a noticia.html pasándole el ID exacto -->
                        
                        </a>
                    </article>
            `;
        }); // <-- Aquí es donde estaba el fallo de las llaves. Esto cierra el forEach.

        // Inyectamos el HTML en la web
        cajaPrincipal.innerHTML += contenidoHTML;
        
        // Actualizamos el contador
        noticiasMostradas += noticiasPorCarga;
    }

    // El evento del scroll infinito
    window.addEventListener('scroll', function() {
        // Calculamos si el usuario ha bajado casi hasta el final de la página (a 200 píxeles del final)
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            dibujarSiguienteLote();
        }
    });