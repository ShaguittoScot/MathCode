const express = require('express');
const router = express.Router();
const CalculoBD = require('../bd/CalculoBD'); 
const autenticarToken = require('../middlewares/authMiddleware');
const calculoClase = require('../clases/calculoClase');

const calculoBD = new CalculoBD(); // Crear una instancia de CalculoBD


// Renderiza la vista de /calculadora con datos
router.get('/calculadora', autenticarToken, async (req, res) => {
  
  try {
    const userId = req.usuario.id;
    console.log('calculadoraRoutes usuario id: '+ userId)
    const historialMySql = await calculoBD.getCalculationHistory(userId);
    const historialCorrectos = historialMySql.filter(calculo => {
      try {
        const calculo1 = new calculoClase(calculo);
        //console.log('Datos recuperados:', JSON.stringify(historialMySql, null, 2));
        return calculo1.id !== undefined &&  calculo1.tipo_figura !== undefined &&  calculo1.datos !== undefined &&  calculo1.area !== undefined && calculo1.perimetro !== undefined && calculo1.fecha !== undefined;
        
      } catch (error) {
        console.error('Error al validar cálculo:', error);
        console.log('Datos recuperados:', JSON.stringify(historialMySql, null, 2));
        return false;
      }
    });

    // Renderizar la vista y pasar el historialCorrectos
    res.render('calculadora', { historialCorrectos });
  } catch (error) {
    console.error('Error al obtener historial de cálculos:', error);
    res.status(500).send('Error al obtener historial de cálculos');
  }
});


// Ruta para agregar un nuevo cálculo (requiere autenticación)
router.post('/calcular', autenticarToken, async (req, res) => {
  try {
    const userId = req.usuario.id; 
    const { tipo_figura, datos, resultados } = req.body;

    // Verifica que los datos estén en formato texto plano
    if (typeof datos !== 'string') {
      return res.status(400).json({ error: 'Datos deben estar en formato texto plano' });
    }

    // Crear una instancia de Calculo con los datos recibidos
    const calculo = new calculoClase({
      tipo_figura,
      datos, 
      area: resultados.area,
      perimetro: resultados.perimetro
    });

    // Insertar el cálculo en la base de datos
    await calculoBD.insertCalculation(userId, calculo);

    res.redirect('/calculadora')
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});


// Ruta para borrar un cálculo (requiere autenticación)
router.get('/borrar/:id', autenticarToken, async (req, res) => {
  try {
    const userId = req.usuario.id; 
    const { id } = req.params;

    // Obtén el cálculo por su ID para verificar su propietario
    const calculo = await calculoBD.getCalculationById(id);

    // Verifica si el cálculo pertenece al usuario autenticado
    if (calculo.usuario_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar este cálculo' });
    }

    // Borra el cálculo de la base de datos
    await calculoBD.deleteCalculation(id);

    //res.status(200).json({ message: 'Cálculo borrado con éxito' });
    res.redirect('/calculadora')
  } catch (error) {
    console.error('Error al borrar el cálculo:', error);
    res.status(500).json({ error: 'Error al borrar el cálculo' });
  }
});


module.exports = router;




