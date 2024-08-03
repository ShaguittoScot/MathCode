require('dotenv').config();
const router = require("express").Router();
const Usuario = require('../clases/userClase');
const UsuarioBD = require('../bd/UsuarioBD');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = process.env.SECRET_KEY; 


// Mostrar formulario para agregar usuario
router.get('/agregarUsuario', (req, res) => {
    res.render('registrer');
  });
// Agregar un nuevo usuario
router.post('/agregarUsuario', async (req, res) => {
    try {
        // Crear la instancia de Usuario
        const usuario1 = new Usuario(req.body);
        await usuario1.establecerContrasena(req.body.contrasena);// Establecer la contraseña y esperar a que se resuelva la promesa
        console.log(usuario1.mostrarDatos);
        if (usuario1.nombre && usuario1.correo && usuario1.contrasena) {
            const usuariobd = new UsuarioBD();
            const nuevoUsuarioId = await usuariobd.nuevoUsuario(usuario1.mostrarDatos);
            usuario1.id = nuevoUsuarioId;            
            // Crear un token JWT
            const token = jwt.sign(
                { id: usuario1.id, nombre: usuario1.nombre, correo: usuario1.correo },
                secret,
                { expiresIn: '1h' } // Token válido por 1 hora
            );
            
            // Configurar la cookie con el token
            res.cookie('token', token, {
                httpOnly: true, // La cookie solo puede ser accedida por el servidor
                secure: process.env.NODE_ENV === 'production', // Usar HTTPS en producción
                maxAge: 3600000 // 1 hora en milisegundos
            });
            res.redirect('/calculadora');
        } else {
            res.render('error', { mensaje: 'Datos del usuario no válidos' });
        }
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        res.render('error', { mensaje: 'Error al agregar usuario' });
    }
});


router.get('/login', (req, res) => {
    res.render('login');
  });

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    try {
        const usuariobd = new UsuarioBD();
        const usuario = await usuariobd.obtenerUsuarioPorCorreo(correo);

        if (usuario && await bcrypt.compare(contrasena, usuario.contrasena)) {
            const token = jwt.sign(
                { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo },
                secret,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, { httpOnly: true, secure: false });
            res.redirect('/calculadora');
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});




//  Ruta para manejar el cierre de sesión, que eliminará el token de la cookie.

router.get('/cerrarSesion', (req, res) => {
    // Aquí puedes manejar el cierre de sesión
    // Por ejemplo, eliminar el token de la cookie
    res.clearCookie('token'); // Nombre de la cookie que almacena el token
    res.redirect('/'); // Redirige al usuario a la página principal o de inicio de sesión
});


/* Mostrar todos los usuarios
ruta.get('/', async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuariosMySql = await usuariobd.mostrarUsuarios();
        const usuariosCorrectos = usuariosMySql.map(usuario => new UsuarioClase(usuario))
            .filter(usuario1 => usuario1.nombre && usuario1.celular && usuario1.correo);

        res.render('mostrarUsuarios', { usuariosCorrectos });
    } catch (error) {
        console.error('Error al mostrar usuarios:', error);
        res.render('error', { mensaje: 'Error al mostrar usuarios' });
    }
}); */



// Mostrar formulario para editar usuario
router.get('/editarUsuario/:idUsuario', async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuario = await usuariobd.usuarioId(req.params.idUsuario);
        res.render('editarUsuario', usuario);
    } catch (error) {
        console.error('Error al obtener usuario para editar:', error);
        res.render('error', { mensaje: 'Error al obtener usuario para editar' });
    }
});

// Editar usuario
router.post('/editarUsuario', async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        await usuariobd.editarUsuario(req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error al editar el usuario:', error);
        res.render('error', { mensaje: 'Error al editar el usuario' });
    }
});

// Borrar usuario
router.get('/borrarUsuario/:id', async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error('Error al borrar el usuario:', error);
        res.render('error', { mensaje: 'Error al borrar el usuario' });
    }
});

module.exports = router;
