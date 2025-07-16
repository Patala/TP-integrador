const usuarioActualJSON = localStorage.getItem("usuarioActual");
let usuarioActual = JSON.parse(usuarioActualJSON);


if (!usuarioActual.favoritos) {
    usuarioActual.favoritos = [];
} 

const botonesFavorito = document.querySelectorAll(".btn-favorito");

for (let i = 0; i < botonesFavorito.length; i++) {
    const btn = botonesFavorito[i];
    const nombre = btn.getAttribute("data-nombre");
    const imgIcono = btn.querySelector(".icono-favorito");

   
    if (usuarioActual.favoritos.includes(nombre)) {
        imgIcono.src = "../img/icons/star-solid.svg"; 
    }

    btn.addEventListener("click", function() {
        toggleFavorito(nombre, imgIcono);
    });
}

function toggleFavorito(nombre, imgIcono) {
    const index = usuarioActual.favoritos.indexOf(nombre);

    if (index === -1) {
       
        usuarioActual.favoritos.push(nombre);
        imgIcono.src = "../img/icons/star-solid.svg";
    } else {
       
        usuarioActual.favoritos.splice(index, 1);
        imgIcono.src = "../img/icons/star-regular.svg";
    }

    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

   
    let userList = JSON.parse(localStorage.getItem("usuarios"));

    
    const i = userList.findIndex(u => u.usuario === usuarioActual.usuario);        
    userList[i] = usuarioActual;
    localStorage.setItem("usuarios", JSON.stringify(userList));
        
    
}

