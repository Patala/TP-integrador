const datos = new CargarDatos();

const url = new URL(window.location.href);
const nombrePelicula = url.searchParams.get("nombre");


let peliculaSeries = datos.obtenerPeliculasSeries();
peliculas = peliculaSeries.filter(e => e.tipo === "pelicula");
pelicula = peliculaSeries.find(p => p.nombre === nombrePelicula);

let titulo = document.querySelector(".nombre");
let duracion = document.querySelector(".duracion");
let genero = document.querySelector(".genero");
let actores = document.querySelector(".actores");
let sinopsis = document.querySelector(".sinopsis");
let iframeDiv = document.querySelector(".iframeDiv");

titulo.textContent = nombrePelicula;
duracion.textContent = pelicula.duracion;
genero.textContent = pelicula.genero.join(", ");
sinopsis.textContent = pelicula.sinopsis;
agregarActores();
agregarIframe();
generarCarousel(peliculas);






function agregarActores() {
    pelicula.actores.forEach(actor => {
        const link = document.createElement("a");
        link.href = actor.wikipedia;
        link.textContent = actor.nombre;
        link.target = "_blank"; 
        actores.appendChild(link);

        actores.appendChild(document.createTextNode(", "));
    });
}

function agregarIframe() {

    const urlVideo = pelicula.videoYoutube;
    const urlObj = new URL(urlVideo);
    const videoId = urlObj.searchParams.get("v");
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;


    const iframe = document.createElement("iframe");
    iframe.className = "iframe";
    iframe.width = "90%";
    iframe.src = embedUrl;
    iframe.title = pelicula.nombre;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    const link = document.createElement("a");
    link.href = embedUrl;
    link.target = "_blank";

    const button = document.createElement("button");
    button.className = "button";
    button.innerHTML = "&nbsp;Comenzar&nbsp;";

    link.appendChild(button);
    iframeDiv.appendChild(iframe);
    iframeDiv.appendChild(link);
}


function  generarCarousel(elementos) {
        const nodoRaiz = document.querySelector(".main-carousel");
        for (let elemento of elementos) {
            const nodoPelicula = document.createElement("div");
            nodoPelicula.className = "carousel-cell";
            if(elemento.tipo === "serie") {
                nodoPelicula.innerHTML = `
                <a href="detalle_serie.html?nombre=${encodeURIComponent(elemento.nombre)}" >
                    <img src="${elemento.imagen}"  alt="${elemento.nombre}" style="width:100%;">
                </a>            
                `;   
            } else if(elemento.tipo === "pelicula") {
                nodoPelicula.innerHTML = `
                <a href="detalle_pelicula.html?nombre=${encodeURIComponent(elemento.nombre)}" >
                    <img src="${elemento.imagen}"  alt="${elemento.nombre}" style="width:100%;">
                </a>            
                `;  
            }
            
        nodoRaiz.appendChild(nodoPelicula);            
        }
    }

