const ConectarBD = require("./connection");
class CalculoBD extends ConectarBD {
    constructor() {
        super();
    }

    // Función para insertar un cálculo en la base de datos
    async insertCalculation(userId, calculo) {
        const sql = "INSERT INTO calculos (usuario_id, tipo_figura, datos, area, perimetro) VALUES (?, ?, ?, ?, ?);";
        try {
            await this.conectarMySql();
            
            const [result] = await this.conexion.execute(sql, [userId, calculo.tipo_figura, calculo.datos, calculo.area, calculo.perimetro]);

            console.log('Cálculo insertado con ID:', result.insertId);

            await this.cerrarConexion();
            return result.insertId;
        } catch (error) {
            console.log('user iD:' + userId);
            console.error('Error al insertar el cálculo:' + error);
            console.error(sql);
            await this.cerrarConexion();
            throw error;
        }
    }

    async getCalculationHistory(userId) {
        const sql = "SELECT * FROM calculos WHERE usuario_id = ? ORDER BY fecha DESC;";
        console.log('id de usuario'+ userId)
        try {
            await this.conectarMySql();  

            const [rows] = await this.conexion.execute(sql, [userId]);

            await this.cerrarConexion();

            console.log("Los datos se obtuvieron correctamente");
            return (rows);
        } catch (error) {
            console.error('Error al obtener el historial de cálculos:', error +" usuarioid: " +userId);
            await this.cerrarConexion();
            throw error;
            
        }
    }

    

    async getCalculationById(id) {
        const sql = "SELECT * FROM calculos WHERE id = ?;";
        try {
            await this.conectarMySql();
    
            const [rows] = await this.conexion.execute(sql, [id]);
    
            await this.cerrarConexion();
    
            if (rows.length === 0) {
                throw new Error(`No se encontró un cálculo con id ${id}`);
            }
    
            return rows[0]; // Retorna el cálculo con su `usuario_id`
        } catch (error) {
            console.error('Error al obtener el cálculo por id:', error);
            await this.cerrarConexion();
            throw error;
        }
    }


    async deleteCalculation(id) {
        const sql = "DELETE FROM calculos WHERE id = ?;";
        try {
            await this.conectarMySql();
    
            const [result] = await this.conexion.execute(sql, [id]);
    
            await this.cerrarConexion();
    
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un cálculo con id ${id}`);
            }
    
            console.log(`Cálculo  sido borrado correctamente`);
        } catch (error) {
            console.error('Error al borrar el cálculo:', error);
            await this.cerrarConexion();
            throw error;
        }
    }
    
    
    
}

module.exports = CalculoBD;


