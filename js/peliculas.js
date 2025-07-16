
const datos = new CargarDatos();
const vista = new vistaPagPrincipal();
const filtros = new Filtros();

let peliculaSeries = datos.obtenerPeliculasSeries();
peliculas = peliculaSeries.filter(e => e.tipo === "pelicula");

vista.generarGrilla(peliculas);
filtros.configurarFiltros(peliculas);