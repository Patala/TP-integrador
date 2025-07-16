const REGEX = {
    CONTRASEÑA : /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[^A-Za-z\d]){2,}).{8,}$/,
    TARJETA: /^[0-9]+$/,
    CVC: /^[1-9]{3}$/,
}


 function hacerFuncionarPaginaPerfil() {
    const userList = JSON.parse(localStorage.getItem("usuarios"));
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    let user;

    for (let i = 0; i < userList.length; i++) {            
            if (userList[i].usuario === usuarioActual.usuario) {
                user = userList[i];
                    break; 
            } 
    }

    const formulario = document.querySelector(".form-registro");
    const mostrarEmail = formulario.querySelector(".js-emailUsuario");
    const mostrarNombreUsuario = document.querySelector(".nombreDeUsuario");
    const btnCancelar = document.querySelector(".botonRegistroCancelar");
    const btnCerrarSesion = document.querySelector(".cerrarSesion");


    const metodoPagoTarjeta = formulario.querySelector("#Tarjeta");
    const metodoPagoCupon = formulario.querySelector("#Cupon");
    const metodoPagoTransferencia = formulario.querySelector("#Transferencia");

    const radioPagoFacil = document.getElementById("PagoFacil");
    const radioRapiPago = document.getElementById("RapiPago");

    const inputNumeroTarjeta = formulario.querySelector("input[name='Tarjeta']");
    const inputCVC = formulario.querySelector("input[name='CVC']");
  

    mostrarEmail.textContent = user.email;
    mostrarNombreUsuario.textContent = user.usuario;

    if (user.metodoPago === "Tarjeta") {
        document.getElementById("Tarjeta").checked = true;
    } else if (user.metodoPago === "Cupon") {
        document.getElementById("Cupon").checked = true;
    } else if (user.metodoPago === "Transferencia") {
        document.getElementById("Transferencia").checked = true;
    }

    if (user.tipoCupon === "Pago facil") {
        document.querySelector(".radioImput1").checked = true;
    } else if (user.tipoCupon === "Rapipago") {
        document.querySelector(".radioImput2").checked = true;
    }

    const numeroTarjetaInput = document.querySelector(".tarjetaInput");
    const cvcInput = document.querySelector(".cvcInput");

    if (user.numeroTarjeta) {
        numeroTarjetaInput.value = user.numeroTarjeta;
    }
    if (user.cvc) {
        cvcInput.value = user.cvc;
    }
    
    formulario.addEventListener("submit", function (event) {
        

        const contraseñaNueva = formulario.querySelector("#nuevaContraseña").value.trim();
        const repetirContraseña = formulario.querySelector("#RepetirContraseña").value.trim();

        const contraseñaNuevaError = formulario.querySelector(".js-contraseña-error");
        const repetirContraseñaError = formulario.querySelector(".js-repetirContraseña-error");
        contraseñaNuevaError.textContent = "";
        repetirContraseñaError.textContent = "";
        let isFormValid = true;
        

        //validar contraseña
        if(contraseñaNueva === "") {
            contraseñaNuevaError.textContent = "Este campo es requerido";
            isFormValid = false;
        } else if (REGEX.CONTRASEÑA.test(contraseñaNueva)){            
            console.log("Contraseña valida");
        } else {
            contraseñaNuevaError.innerHTML = "Debe tener al menos 8 caracteres,<br>2 letras, 2 números y 2 caracteres especiales.";
            isFormValid = false;
        };

        //validar repetirContraseña
        if(repetirContraseña === "") {
            repetirContraseñaError.textContent = "Este campo es requerido";
            isFormValid = false;
        } else if(repetirContraseña !== contraseñaNueva) {
            repetirContraseñaError.textContent = "Las contraseñas no coinciden.";
            isFormValid = false;
        };

        if(isFormValid) {
            user.numeroTarjeta = numeroTarjetaInput.value.trim();
            user.cvc = cvcInput.value.trim();
        }

        //VALIDAR METODOS DE PAGO
       

        
        const radiosTipo = formulario.querySelectorAll("input[name='Tipo']");
    

        const metodoPagoError = formulario.querySelector(".js-metodoPago-error");
        let metodoPagoValido = true;
        metodoPagoError.textContent = "";

        //Validar metodo de pago Tarjeta
        if (metodoPagoTarjeta.checked) {
            if (numeroTarjetaInput.value.trim() === "" || cvcInput.value.trim() === "") {
                metodoPagoError.textContent = "Debe completar número de tarjeta y CVC.";
                metodoPagoValido = false;
                isFormValid = false;
            } else if (cvcInput.value.trim() === "000") {
                metodoPagoError.textContent = "El CVC no puede ser 000.";
                metodoPagoValido = false;
                isFormValid = false;
            } else if (numeroTarjetaInput.value.trim().length < 16) {
                metodoPagoError.textContent = "El numero de la tarjeta esta incompleto";                
            } else if (REGEX.TARJETA.test(numeroTarjetaInput.value.trim()) && REGEX.CVC.test(cvcInput.value.trim())) {
                console.log("Numeros validos");
            } else {
                metodoPagoError.textContent = "Solo se aceptan numeros validos en los campos de tarjeta";
                isFormValid = false;
            }
        }

        //Validar metodo de pago Cupon
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

        let metodoPago = "";
        let numeroTarjetaBandera = "";
        let cvcBandera = "";
        let tipoCupon = "";

        if (metodoPagoTarjeta.checked) {
            metodoPago = "Tarjeta";
            numeroTarjetaBandera = numeroTarjetaInput.value.trim();
            cvcBandera = cvcInput.value.trim();
        } else if (metodoPagoCupon.checked) {
            metodoPago = "Cupon";
            radiosTipo.forEach(radio => {
                if (radio.checked) {
                    tipoCupon = radio.nextSibling.nodeValue.trim(); 
                }
            });
        } else if (metodoPagoTransferencia.checked) {
            metodoPago = "Transferencia";
        }

       

        const mensajeExito = document.querySelector(".exito");

        if (isFormValid) {
            user.numeroTarjeta = numeroTarjetaBandera;
            user.cvc = cvcBandera;
            user.metodoPago = metodoPago;
            user.tipoCupon = tipoCupon;
            user.contraseña = contraseñaNueva;
            usuarioActual.numeroTarjeta = numeroTarjetaBandera;
            usuarioActual.cvc= cvcBandera;
            usuarioActual.metodoPago = metodoPago; 
            usuarioActual.tipoCupon = tipoCupon;
            usuarioActual.contraseña = contraseñaNueva;
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].usuario === usuarioActual.usuario) {

                    userList[i] = user;                   
                }           
            }
             localStorage.setItem("usuarios", JSON.stringify(userList));
             localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
             
            
            mensajeExito.textContent = "Datos actualizados";
            
        }
        event.preventDefault();
        
        

    })

    btnCancelar.addEventListener("click", function() {
        for (let i = 0; i < userList.length; i++) {
                if (userList[i].usuario === user.usuario) {

                    userList.splice(i, 1);
                    break;
                                  
                }           
            }
            localStorage.setItem("usuarios", JSON.stringify(userList));
            localStorage.removeItem("usuarioActual");   
    })


    btnCerrarSesion.addEventListener("click", function() {
        localStorage.removeItem("usuarioActual");  
    })
    
    // ✅ Función para habilitar/deshabilitar radios del cupón
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
    // Escuchar cambios
    metodoPagoTarjeta.addEventListener("change", actualizarInputsTarjeta);
    metodoPagoCupon.addEventListener("change", actualizarInputsTarjeta);
    metodoPagoTransferencia.addEventListener("change", actualizarInputsTarjeta);


    // Eventos para actualizar
    metodoPagoTarjeta.addEventListener("change", actualizarRadiosCupon);
    metodoPagoCupon.addEventListener("change", actualizarRadiosCupon);
    metodoPagoTransferencia.addEventListener("change", actualizarRadiosCupon);

    // Ejecutar al inicio
    actualizarRadiosCupon();
    actualizarInputsTarjeta();
 }

 hacerFuncionarPaginaPerfil();
 agregarCarouselDeFavoritos();

 function agregarCarouselDeFavoritos() {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    const titulo = document.querySelector(".titulo1");
    const mainCarousel = document.querySelector(".main-carousel");

    let tituloFav = titulo.querySelector("h1");

    if (usuarioActual.favoritos.length > 0) {
        let tituloFav = document.createElement("h1");
        tituloFav.textContent = "Favoritos";
        titulo.appendChild(tituloFav);
        mainCarousel.style.display = "block";
        generarCarousel(arrayDeFavoritos());
    } else {
        if (tituloFav) {
            titulo.removeChild(tituloFav);
        }
        if (mainCarousel) {
            mainCarousel.style.display = "none";  // Ocultar carousel
        }
    }

 }

 function arrayDeFavoritos() {
    const peliculasYseries = JSON.parse(localStorage.getItem("peliculasSeries"));
    const peliculasFavoritas = [];
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    for (let i=0; i<peliculasYseries.length; i++) {
        for (let y=0; y<usuarioActual.favoritos.length; y++) {
            if (peliculasYseries[i].nombre == usuarioActual.favoritos[y]) {
                peliculasFavoritas.push(peliculasYseries[i]);
            }
        }            
    }
    return peliculasFavoritas;
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

