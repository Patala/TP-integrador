class CargarDatos {

    obtenerPeliculasSeries() {
        let peliculasSeries = [];
        const peliculasSeriesJSON = localStorage.getItem("peliculasSeries");
        if(!peliculasSeriesJSON) {
            localStorage.setItem("peliculasSeries", JSON.stringify(peliculasYseries));
            peliculasSeries = peliculasYseries;
        } else {
            peliculasSeries = JSON.parse(peliculasSeriesJSON);
        }
        return peliculasSeries;
    }
}