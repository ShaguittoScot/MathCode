var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

var nombre = document.getElementById("nombre");
var mensajeNombre = document.querySelector(".mensajeNombre");
var circleCrossNombre = document.querySelector(".circleCrossNombre");
var circleCheckNombre = document.querySelector(".circleCheckNombre");

var correo = document.getElementById("correo");
var mensajeCorreo = document.querySelector(".mensajeCorreo");
var circleCrossCorreo = document.querySelector(".circleCrossCorreo");
var circleCheckCorreo = document.querySelector(".circleCheckCorreo");

var contrasena = document.getElementById("contrasena");
var confirmarContrasena = document.getElementById("confirmarContrasena");
var mensajeContrasena = document.querySelector(".mensajeContrasena");
var circleCrossContrasena = document.querySelector(".circleCrossContrasena");
var circleCheckContrasena = document.querySelector(".circleCheckContrasena");


var enviarDatos = 0;

function validarNombre() {
    if (!regexNombre.test(nombre.value)) {
        enviarDatos++;
        mensajeNombre.classList.remove("ocultar");
        nombre.classList.add("error");
        circleCrossNombre.classList.remove("ocultar");
        circleCheckNombre.classList.add("ocultar");
    } else {
        mensajeNombre.classList.add("ocultar");
        nombre.classList.add("correcto");
        circleCrossNombre.classList.add("ocultar");
        circleCheckNombre.classList.remove("ocultar");
        nombre.classList.remove("error");
    }
}

function validarCorreo() {
    if (!regexCorreo.test(correo.value)) {
        enviarDatos++;
        mensajeCorreo.classList.remove("ocultar");
        correo.classList.add("error");
        circleCrossCorreo.classList.remove("ocultar");
        circleCheckCorreo.classList.add("ocultar");
    } else {
        mensajeCorreo.classList.add("ocultar");
        correo.classList.add("correcto");
        circleCrossCorreo.classList.add("ocultar");
        circleCheckCorreo.classList.remove("ocultar");
        correo.classList.remove("error");
    }
}

function validarContrasena() {
    var errorMsg = [];
    var valid = true;

    // Verificar longitud mínima
    if (contrasena.value.length < 8) {
        errorMsg.push("La contraseña debe tener al menos 8 caracteres.");
        valid = false;
    }

    // Verificar letra minúscula
    if (!/[a-z]/.test(contrasena.value)) {
        errorMsg.push("La contraseña debe contener al menos una letra minúscula.");
        valid = false;
    }

    // Verificar letra mayúscula
    if (!/[A-Z]/.test(contrasena.value)) {
        errorMsg.push("La contraseña debe contener al menos una letra mayúscula.");
        valid = false;
    }

    // Verificar dígito
    if (!/\d/.test(contrasena.value)) {
        errorMsg.push("La contraseña debe contener al menos un número.");
        valid = false;
    }

    // Verificar carácter especial
    if (!/[@$!%*?&]/.test(contrasena.value)) {
        errorMsg.push("La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &).");
        valid = false;
    }

    // Verificar coincidencia de contraseñas
    if (contrasena.value !== confirmarContrasena.value) {
        errorMsg.push("Las contraseñas no coinciden.");
        valid = false;
    }

    if (valid) {
        mensajeContrasena.classList.add("ocultar");
        contrasena.classList.add("correcto");
        confirmarContrasena.classList.add("correcto");
        circleCrossContrasena.classList.add("ocultar");
        circleCheckContrasena.classList.remove("ocultar");
        contrasena.classList.remove("error");
        confirmarContrasena.classList.remove("error");
    } else {
        mensajeContrasena.classList.remove("ocultar");
        mensajeContrasena.innerHTML = errorMsg.join("<br>");
        contrasena.classList.add("error");
        confirmarContrasena.classList.add("error");
        circleCrossContrasena.classList.remove("ocultar");
        circleCheckContrasena.classList.add("ocultar");
    }
}

nombre.addEventListener("blur", validarNombre);
correo.addEventListener("blur", validarCorreo);
contrasena.addEventListener("blur", validarContrasena);
confirmarContrasena.addEventListener("blur", validarContrasena);

var formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarDatos = 0; // Resetear el contador de errores

    validarNombre();
    validarCorreo();
    validarContrasena();

    if (enviarDatos === 0) {
        formulario.submit();
    }
});
