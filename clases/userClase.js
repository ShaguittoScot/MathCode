const bcrypt = require('bcrypt');

class Usuario {
    constructor(usuario1) {
        this.id = usuario1.id;  // 
        this.nombre = usuario1.nombre;
       // this.apellidos = usuario1.apellidos; 
        this.correo = usuario1.correo;
        this.establecerContrasena(usuario1.contrasena); // Usa el método async
    }

    // Métodos set para propiedades
    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        } else {
            throw new Error("Nombre no válido");
        }
    }


    set correo(correo) {
        var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexCorreo.test(correo)) {
            this._correo = correo;
        } else {
            throw new Error("Correo electrónico no válido");
        }
    }

    async establecerContrasena(contrasena) {
        // Validar y encriptar la contraseña
        if (contrasena && contrasena.length >= 6) {
            const saltRounds = 10;
            this._contrasena = await bcrypt.hash(contrasena, saltRounds);
        } else {
            console.log('Contraseña recibida:', contrasena);
            throw new Error("Contraseña no válida "+contrasena);
            

        }
    }

    // Métodos get para propiedades
    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }


    get correo() {
        return this._correo;
    }

    get contrasena() {
        return this._contrasena;
    }

    get mostrarDatos() {
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo,
            contrasena: this.contrasena  
        };
    }
}

module.exports = Usuario;
