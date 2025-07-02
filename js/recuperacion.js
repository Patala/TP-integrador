function validarRecuperarContraseña() {

    //IMPUTS TO VALIDATE
    const userList = JSON.parse(localStorage.getItem("usuarios"));
    const formRecuperacion = document.querySelector(".formulario-recuperacion");
    const emailInput = formRecuperacion.querySelector("#email");
    const usuarioInput = formRecuperacion.querySelector("#usuario");
    const buttonRecuperar = formRecuperacion.querySelector(".boton-recuperar");

    //VERIFICAR QUE LOS CAMPOS ESTEN COMPLETOS
    function verificarCamposCompletos() {
        if (emailInput.value.trim() !== "" && usuarioInput.value.trim() !== "") {
            buttonRecuperar.disabled = false;
        } else {
            buttonRecuperar.disabled = true;
        }
    }
    verificarCamposCompletos();

    usuarioInput.addEventListener("input", verificarCamposCompletos);
    emailInput.addEventListener("input", verificarCamposCompletos);

    formRecuperacion.addEventListener("submit", function(event) {
        

        const usuarioIngresado = usuarioInput.value.trim();
        const emailIngresado = emailInput.value.trim();
        let usuarioEncontrado;

       
        const errorNoseEncontroUsuario = document.querySelector(".js-noSeEncontroUsuario-error");

        let isFormValid = true;

        errorNoseEncontroUsuario.textContent = "";

        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            if (user.usuario === usuarioIngresado && user.email === emailIngresado) {
                usuarioEncontrado = user;
                break; 
            } 
        }
        
        if(!usuarioEncontrado) {
            errorNoseEncontroUsuario.textContent = "Usuario o email incorrecto"
            isFormValid = false;
        }

        if (!isFormValid) {
                event.preventDefault();
        }        
    })

}

validarRecuperarContraseña();