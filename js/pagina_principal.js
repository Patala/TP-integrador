

const datos = new CargarDatos();
const vista = new vistaPagPrincipal();
const filtros = new Filtros();

let peliculas = datos.obtenerPeliculasSeries();
vista.generarGrilla(peliculas);
filtros.configurarFiltros();

