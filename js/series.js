
const datos = new CargarDatos();
const vista = new vistaPagPrincipal();
const filtros = new Filtros(vista);

let peliculaSeries = datos.obtenerPeliculasSeries();
let peliculas = peliculaSeries.filter(e => e.tipo === "serie");

vista.generarGrilla(peliculas);
filtros.configurarFiltros(peliculas);