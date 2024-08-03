const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const port = 3000;

// Importar routers
const indexRouter = require('./routes/index');
const calculadoraRouter = require('./routes/calculadoraRoutes');
const registerRouter = require('./routes/userRoutes'); // Asegúrate de tener este archivo

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(cookieParser());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de middlewares
app.use(express.urlencoded({ extended: true })); // Para procesar datos del formulario

// Usar routers
app.use('/', indexRouter);
app.use('/', calculadoraRouter); // Usa un prefijo para evitar solapamientos con otras rutas
app.use('/', registerRouter); // Ruta para registro

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
