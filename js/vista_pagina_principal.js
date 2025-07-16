class vistaPagPrincipal{

    generarGrilla(elementos) {
        const nodoRaiz = document.querySelector(".grilla-peliculas");
        for (let elemento of elementos) {
            const nodoPelicula = document.createElement("div");
            nodoPelicula.className = "pelicula";
            if(elemento.tipo === "serie") {
                nodoPelicula.innerHTML = `
                <a href="detalle_serie.html?nombre=${encodeURIComponent(elemento.nombre)}" >
                    <img src="${elemento.imagen}"  alt="${elemento.nombre}">
                </a> 
                <button class="btn-favorito" data-nombre="${elemento.nombre}">
                    <img src="../img/icons/star-regular.svg" alt="Favorito" class="icono-favorito">
                </button>
                `;   
            } else if(elemento.tipo === "pelicula") {
                nodoPelicula.innerHTML = `
                <a href="detalle_pelicula.html?nombre=${encodeURIComponent(elemento.nombre)}" >
                    <img src="${elemento.imagen}"  alt="${elemento.nombre}">
                </a>    
                 <button class="btn-favorito" data-nombre="${elemento.nombre}">
                    <img src="../img/icons/star-regular.svg" alt="Favorito" class="icono-favorito">
                 </button>     
                `;  
            }
            
        nodoRaiz.appendChild(nodoPelicula);            
        }
    }

}
