const ConectarBD = require("./connection");
class Usuario extends ConectarBD {
    constructor() {
        super();
    }

    async nuevoUsuario(usuario) {
        const sql = "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?);";
        try {
            await this.conectarMySql();
            // Usar consultas preparadas para evitar inyección SQL
            const [result] = await this.conexion.execute(sql, [usuario.nombre, usuario.correo, usuario.contrasena]);
            console.log("Se ha creado un nuevo usuario con ID:", result.insertId);
            await this.cerrarConexion();
            return result.insertId; //retornar el ID del nuevo usuario
        } catch (error) {
            console.error("ERROR AL AGREGAR USUARIO: " + error);
            console.error(sql);
            await this.cerrarConexion();
            throw error; // lanzar el error para manejarlo en el controlador
        }
    }

    async obtenerUsuarioPorCorreo(correo) {
        const sql = "SELECT * FROM usuarios WHERE correo = ?";
        try {
            await this.conectarMySql();
            const [rows] = await this.conexion.execute(sql, [correo]);
            await this.cerrarConexion();
            return rows[0]; // Retorna el primer resultado encontrado
        } catch (error) {
            console.error("ERROR AL OBTENER USUARIO: " + error);
            throw error;
        }
    }
    
    async mostrarUsuarios() {
        const sql = "SELECT * FROM usuarios;";
        try {
            await this.conectarMySql();
            const [usuariosMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return usuariosMySql;
        } catch (error) {
            console.error("Error al obtener los datos de los usuarios: " + error);
            console.error(sql);
        }
    }

    async usuarioId(id) {
        const sql = "SELECT * FROM usuarios WHERE id = ?;";
        try {
            await this.conectarMySql();
            const [[usuario]] = await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Consulta correcta por id");
            return usuario;
        } catch (error) {
            console.error("Error al consultar por id: " + error);
            console.error(sql);
        }
    }

    async editarUsuario(usuario) {
        // Encriptar la contraseña si ha sido cambiada
        const sql = "UPDATE usuarios SET nombre = ?, apellidos = ?, correo = ?, contraseña = ? WHERE id = ?;";
        try {
            await this.conectarMySql();
            // Verificar si la contraseña ha cambiado
            const hashedPassword = usuario.contrasena ? await this.encriptarContraseña(usuario.contrasena) : usuario.contrasena;
            await this.conexion.execute(sql, [usuario.nombre, usuario.apellidos, usuario.correo, hashedPassword, usuario.id]);
            await this.cerrarConexion();
            console.log("Actualización correcta del usuario");
        } catch (error) {
            console.error("Error al editar usuario: " + error);
            console.error(sql);
        }
    }

    async borrarUsuario(id) {
        const sql = "DELETE FROM usuarios WHERE id = ?;";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [id]);
            await this.cerrarConexion();
            console.log("Usuario borrado");
        } catch (error) {
            console.error("Error al borrar el usuario: " + error);
            console.log(sql);
        }
    }

    // Método para encriptar la contraseña
    async encriptarContraseña(contrasena) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        return bcrypt.hash(contrasena, saltRounds);
    }
}

module.exports = Usuario;
