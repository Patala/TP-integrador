class Filtros {
  

    configurarFiltros() {
        const inputBusqueda = document.querySelector(".input-lupa");
        const selectGenero = document.querySelector("#categoria");

        // Funcion común que filtra usando ambos
        const aplicarFiltros = () => {
            const texto = inputBusqueda.value.toLowerCase();
            const generoSeleccionado = selectGenero.value;

            let filtrados = peliculas;
       
            if (texto !== "") {
                filtrados = filtrados.filter(e => e.nombre.toLowerCase().includes(texto));
            }
           
            if (generoSeleccionado !== "Todas las categorías") {
                filtrados = filtrados.filter(e => e.genero.includes(generoSeleccionado));
            }

            document.querySelector(".grilla-peliculas").innerHTML = "";
            vista.generarGrilla(filtrados);
        };
      
        inputBusqueda.addEventListener("input", aplicarFiltros);
        selectGenero.addEventListener("change", aplicarFiltros);
    }

  
}