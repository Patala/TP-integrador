const ERROR_MESSAGES = {
    nombre : "Este campo es requerido",
    apellido : "Este campo es requerido",
    email : "Email invalido",
    nombreUsuario : "Este campo es requerido",
    contraseña: "Este campo es requerido",
    repetirContraseña : "Este campo es requerido",
    metodoPagoError: "Debe seleccionar un método de pago",
};

const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    NOMBRE: /^[A-Za-z]+$/,
    APELLIDO: /^[A-Za-z]+$/,
    USUARIO: /^[a-zA-Z0-9]+$/,
    CONTRASEÑA : /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[^A-Za-z\d]){2,}).{8,}$/,
    TARJETA: /^[0-9]+$/,
    CVC: /^[1-9]{3}$/,
}

let userList = [];

const usuariosJSON = localStorage.getItem("usuarios");
if(!usuariosJSON) {
    localStorage.setItem("usuarios", JSON.stringify(userList))
} else {
    userList = JSON.parse(usuariosJSON);
}


function registroValidado() {
    const registroForm = document.querySelector(".form-registroYPerfil");
    const submitBtn = registroForm.querySelector(".botonEnviarEmail");

    
    const metodoPagoTarjeta = registroForm.querySelector("#Tarjeta");
    const metodoPagoCupon = registroForm.querySelector("#Cupon");
    const metodoPagoTransferencia = registroForm.querySelector("#Transferencia");

    const radioPagoFacil = document.getElementById("PagoFacil");
    const radioRapiPago = document.getElementById("RapiPago");

    const inputNumeroTarjeta = registroForm.querySelector("input[name='Tarjeta']");
    const inputCVC = registroForm.querySelector("input[name='CVC']");
    
    

    registroForm.addEventListener("submit", function (event) {
       
        const userName = registroForm.querySelector("#nombre").value.trim();
        const userApellido = registroForm.querySelector("#apellido").value.trim();
        const email = registroForm.querySelector("#email").value.trim();
        const usuario = registroForm.querySelector("#usuario").value.trim();
        const contraseña = registroForm.querySelector("#contraseña").value.trim();
        const repetirContraseña = registroForm.querySelector("#RepetirContraseña").value.trim();

       
        const nombreError = registroForm.querySelector(".js-nombre-error");
        const apellidoError = registroForm.querySelector(".js-apellido-error");
        const emailError = registroForm.querySelector(".js-email-error");
        const nombreUsuarioError = registroForm.querySelector(".js-nombreUsuario-error");
        const contraseñaError = registroForm.querySelector(".js-contraseña-error");
        const repetirContraseñaError = registroForm.querySelector(".js-repetirContraseña-error");
        const metodoPagoError = registroForm.querySelector(".js-metodoPago-error");

     
        nombreError.textContent = "";
        apellidoError.textContent = "";
        emailError.textContent = "";
        nombreUsuarioError.textContent = "";
        contraseñaError.textContent = "";
        repetirContraseñaError.textContent = "";
        metodoPagoError.textContent = "";

        let isFormValid = true;

        // Validar nombre
        if (userName === "") {
            nombreError.textContent = ERROR_MESSAGES.nombre;
            isFormValid = false;
        } else if (!REGEX.NOMBRE.test(userName)) {
            nombreError.textContent = "Este campo solo acepta letras";
            isFormValid = false;
        }

        // Validar apellido
        if (userApellido === "") {
            apellidoError.textContent = ERROR_MESSAGES.apellido;
            isFormValid = false;
        } else if (!REGEX.APELLIDO.test(userApellido)) {
            apellidoError.textContent = "Este campo solo acepta letras";
            isFormValid = false;
        }

        // Validar email
        if (email === "") {
            emailError.textContent = ERROR_MESSAGES.email;
            isFormValid = false;
        } else if (!REGEX.EMAIL.test(email)) {
            emailError.textContent = "Formato inválido de email";
            isFormValid = false;
        }

        // Validar usuario
        if (usuario === "") {
            nombreUsuarioError.textContent = ERROR_MESSAGES.nombreUsuario;
            isFormValid = false;
        } else if (!REGEX.USUARIO.test(usuario)) {
            nombreUsuarioError.textContent = "Solo acepta letras y números";
            isFormValid = false;
        }

        // Validar contraseña
        if (contraseña === "") {
            contraseñaError.textContent = ERROR_MESSAGES.contraseña;
            isFormValid = false;
        } else if (!REGEX.CONTRASEÑA.test(contraseña)) {
            contraseñaError.innerHTML = "Debe tener al menos 8 caracteres,<br>2 letras, 2 números y 2 caracteres especiales.";
            isFormValid = false;
        }

        // Validar repetir contraseña
        if (repetirContraseña === "") {
            repetirContraseñaError.textContent = ERROR_MESSAGES.repetirContraseña;
            isFormValid = false;
        } else if (repetirContraseña !== contraseña) {
            repetirContraseñaError.textContent = "Las contraseñas no coinciden.";
            isFormValid = false;
        }

        // Validar método de pago
        const numeroTarjeta = registroForm.querySelector("input[name='Tarjeta']").value.trim();
        const cvc = registroForm.querySelector("input[name='CVC']").value.trim();
        
        const radiosTipo = registroForm.querySelectorAll("input[name='Tipo']");

        let metodoPagoValido = true;

        if (!metodoPagoTarjeta.checked && !metodoPagoCupon.checked && !metodoPagoTransferencia.checked) {
            metodoPagoError.textContent = "Debe seleccionar un método de pago.";
            metodoPagoValido = false;
            isFormValid = false;
        }

        if (metodoPagoTarjeta.checked) {
            if (numeroTarjeta === "" || cvc === "") {
                metodoPagoError.textContent = "Debe completar número de tarjeta y CVC.";
                metodoPagoValido = false;
                isFormValid = false;
            } else if (cvc === "000") {
                metodoPagoError.textContent = "El CVC no puede ser 000.";
                metodoPagoValido = false;
                isFormValid = false;
            } else if (numeroTarjeta.length < 16) {
                metodoPagoError.textContent = "El número de la tarjeta está incompleto";
                isFormValid = false;
            } else if (!REGEX.TARJETA.test(numeroTarjeta) || !REGEX.CVC.test(cvc)) {
                metodoPagoError.textContent = "Solo se aceptan números válidos en los campos de tarjeta.";
                isFormValid = false;
            }
        }

        if (metodoPagoCupon.checked) {
            let tipoSeleccionado = false;
            radiosTipo.forEach(radio => {
                if (radio.checked) tipoSeleccionado = true;
            });
            if (!tipoSeleccionado) {
                metodoPagoError.textContent = "Debe seleccionar Pago Fácil o Rapipago.";
                metodoPagoValido = false;
                isFormValid = false;
            }
        }

        if (!isFormValid) {
            event.preventDefault();
        }

        
        if (isFormValid) {
            let tipoCupon = "";
            radiosTipo.forEach(radio => {
                if (radio.checked) {
                    tipoCupon = radio.nextSibling.nodeValue.trim();
                }
            });

            let metodoPago = "";
            let numeroTarjetaBandera = "";
            let cvcBandera = "";

            if (metodoPagoTarjeta.checked) {
                metodoPago = "Tarjeta";
                numeroTarjetaBandera = numeroTarjeta;
                cvcBandera = cvc;
            } else if (metodoPagoCupon.checked) {
                metodoPago = "Cupon";
            } else if (metodoPagoTransferencia.checked) {
                metodoPago = "Transferencia";
            }

            userList.push({
                nombre: userName,
                apellido: userApellido,
                email: email,
                usuario: usuario,
                contraseña: contraseña,
                metodoPago: metodoPago,
                numeroTarjeta: numeroTarjetaBandera,
                cvc: cvcBandera,
                tipoCupon: tipoCupon
            });

            localStorage.setItem("usuarios", JSON.stringify(userList));
            registroForm.reset();
        }
    });

   
    function actualizarRadiosCupon() {
        if (metodoPagoCupon.checked) {
            radioPagoFacil.disabled = false;
            radioRapiPago.disabled = false;
        } else {
            radioPagoFacil.disabled = true;
            radioPagoFacil.checked = false;
            radioRapiPago.disabled = true;
            radioRapiPago.checked = false;
        }
    }

    function actualizarInputsTarjeta() {
    if (metodoPagoTarjeta.checked) {
        inputNumeroTarjeta.disabled = false;
        inputCVC.disabled = false;
    } else {
        inputNumeroTarjeta.disabled = true;
        inputCVC.disabled = true;
        inputNumeroTarjeta.value = "";
        inputCVC.value = "";
    }
}
   
    metodoPagoTarjeta.addEventListener("change", actualizarInputsTarjeta);
    metodoPagoCupon.addEventListener("change", actualizarInputsTarjeta);
    metodoPagoTransferencia.addEventListener("change", actualizarInputsTarjeta);


    
    metodoPagoTarjeta.addEventListener("change", actualizarRadiosCupon);
    metodoPagoCupon.addEventListener("change", actualizarRadiosCupon);
    metodoPagoTransferencia.addEventListener("change", actualizarRadiosCupon);

    
    actualizarRadiosCupon();
    actualizarInputsTarjeta();
}

  


registroValidado();


    