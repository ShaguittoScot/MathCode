class Calculo {
constructor(calculo1) {
    this.id = calculo1.id;
    this.usuario_id = calculo1.usuario_id;
    this.tipo_figura = calculo1.tipo_figura; 
    this.datos = calculo1.datos;           
    this.area = calculo1.area;             
    this.perimetro = calculo1.perimetro;
    this.fecha = calculo1.fecha;   
}


    // Métodos set para propiedades

    set id(id) {
        this._id = id;
    }

    set usuario_id(usuario_id){
        this._usuario_id=usuario_id;
    }

    set tipo_figura(tipo_figura) {
        const tiposValidos = ['cuadrado', 'rectángulo', 'triángulo', 'círculo'];
        if (tiposValidos.includes(tipo_figura)) {
            this._tipo_figura = tipo_figura;
        } else {
            throw new Error("Tipo de figura no válido " + tipo_Figura);
        }
    }

    set datos(datos) {
        if (typeof datos === 'string') {
            this._datos = datos;
        } else {
            throw new Error("Datos deben estar en formato texto plano " + datos );
        }
    }

    set area(area) {
        const areaNumber = parseFloat(area); // Convierte el valor a un número
        if (typeof areaNumber === 'number' && areaNumber >= 0) {
            this._area = areaNumber;
        } else {
            throw new Error("Área no válida " + area);
        }
    }

    set perimetro(perimetro) {
        const perimetroNumber = parseFloat(perimetro); // Convierte el valor a un número
        if (typeof perimetroNumber === 'number' && perimetroNumber >= 0) {
            this._perimetro = perimetroNumber;
        } else {
            throw new Error("Perímetro no válido " + perimetro);
        }
    }

    set fecha(fecha){
        this._fecha=fecha;
    }

    // Métodos get para propiedades
    get id() {
        return this._id;
    }
    get usuario_id(){
        return this._usuario_id;
    }
    get fecha(){
        return this._fecha;
    }
    get tipo_figura() {
        return this._tipo_figura;
    }

    get datos() {
        return this._datos;
    }

    get area() {
        return this._area;
    }

    get perimetro() {
        return this._perimetro;
    }

    get mostrarDatos() {
        return {
            id: this.id,
            tipo_figura: this.tipo_figura,
            datos: this.datos,
            area: this.area,
            perimetro: this.perimetro,
            fecha: this.fecha
        };
    }
}

module.exports = Calculo;

