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

    // Verificar si ya es favorito
    if (usuarioActual.favoritos.includes(nombre)) {
        imgIcono.src = "../img/icons/star-solid.svg"; // llena
    }

    btn.addEventListener("click", function() {
        toggleFavorito(nombre, imgIcono);
    });
}

function toggleFavorito(nombre, imgIcono) {
    const index = usuarioActual.favoritos.indexOf(nombre);

    if (index === -1) {
        // Agregar
        usuarioActual.favoritos.push(nombre);
        imgIcono.src = "../img/icons/star-solid.svg";
    } else {
        // Quitar
        usuarioActual.favoritos.splice(index, 1);
        imgIcono.src = "../img/icons/star-regular.svg";
    }

    // Guardar actualizado
    localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

    // Si usás array global de usuarios
    let userList = JSON.parse(localStorage.getItem("usuarios"));
    if (userList) {
        const i = userList.findIndex(u => u.usuario === usuarioActual.usuario);        
        userList[i] = usuarioActual;
        localStorage.setItem("usuarios", JSON.stringify(userList));
        
    }
}

