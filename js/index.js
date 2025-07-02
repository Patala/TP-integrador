function validarLogin() {

    //IMPUTS TO VALIDATE
    const userList = JSON.parse(localStorage.getItem("usuarios"));
    const formLogin = document.querySelector("#formularioLogin");
    const usuarioInput = formLogin.querySelector("#usuario");
    const contraseñaInput = formLogin.querySelector("#contraseña");
    const buttonLogin = formLogin.querySelector("#botonLogin");
    

    

    //VERIFICAR QUE LOS CAMPOS ESTEN COMPLETOS
    function verificarCamposCompletos() {
        if (usuarioInput.value.trim() !== "" && contraseñaInput.value.trim() !== "") {
            buttonLogin.disabled = false;
        } else {
            buttonLogin.disabled = true;
        }
    }
    verificarCamposCompletos();

    usuarioInput.addEventListener("input", verificarCamposCompletos);
    contraseñaInput.addEventListener("input", verificarCamposCompletos);

    formLogin.addEventListener("submit", function(event) {
        

        const usuarioIngresado = usuarioInput.value.trim();
        const contraseñaIngresada = contraseñaInput.value.trim();
        let usuarioEncontrado;

       
        const errorNoseEncontroUsuario = document.querySelector(".js-noSeEncontroUsuario-error");

        let isFormValid = true;

        errorNoseEncontroUsuario.textContent = "";

        for (let i = 0; i < userList.length; i++) {
            const user = userList[i];
            if (user.usuario === usuarioIngresado && user.contraseña === contraseñaIngresada) {
                usuarioEncontrado = user;
                localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));
                break; 
            } 
        }
        
        if(!usuarioEncontrado) {
            errorNoseEncontroUsuario.textContent = "Usuario o contraseña incorrecta"
            isFormValid = false;
        }

        if (!isFormValid) {
                event.preventDefault();
        }        
    })

}

validarLogin();

