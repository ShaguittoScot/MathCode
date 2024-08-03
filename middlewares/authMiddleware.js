require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY; // Lee la clave secreta desde el archivo .env

function autenticarToken(req, res, next) {
    // Verifica si el token está presente en las cookies
    const token = req.cookies ? req.cookies.token : null;
    console.log('Token recibido:', token); // Para depuración
    if (token == null) {
        // Redirige a la página de inicio de sesión si no hay token
        return res.redirect('/login');
    }
    jwt.verify(token, secret, (err, usuario) => {
        if (err) {
            // Redirige a la página de inicio de sesión si el token es inválido
            return res.redirect('/login');
        }
        // Agregar la información del usuario a la solicitud
        req.usuario = usuario;
        next();
    });
}

module.exports = autenticarToken;

