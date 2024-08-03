function showFields() {
    var shape = document.getElementById("shape").value;
    var fields = document.querySelectorAll(".shape-fields");
    fields.forEach(function(field) {
        field.classList.remove("active");
    });
    var activeField = document.getElementById(shape + "Fields");
    if (activeField) {
        activeField.classList.add("active");
    } else {
        console.error(`No se encontró el campo para la figura: ${shape}`);
    }
}

function calculate() {
    var shape = document.getElementById("shape").value;
    var areaResult = document.getElementById("areaResult");
    var perimetroResult = document.getElementById("perimeterResult");
    var area, perimetro;
    let datos;

    switch (shape) {
        case "square":
            var lado = parseFloat(document.getElementById("squareSide").value);
            if (!isNaN(lado) && lado > 0) {
                area = (lado * lado).toFixed(2);
                perimetro = (4 * lado).toFixed(2);
                areaResult.innerText = area;
                perimetroResult.innerText = perimetro;
                datos = `lado=${lado}`;
                sendCalculationData('cuadrado', datos, area, perimetro);
                console.log(datos);
            } else {
                areaResult.innerText = "Invalid input";
                perimetroResult.innerText = "Invalid input";
            }
            break;
        case "rectangle":
            var longitud = parseFloat(document.getElementById("rectangleLength").value);
            var ancho = parseFloat(document.getElementById("rectangleWidth").value);
            if (!isNaN(longitud) && longitud > 0 && !isNaN(ancho) && ancho > 0) {
                area = (longitud * ancho).toFixed(2);
                perimetro = (2 * (longitud + ancho)).toFixed(2);
                areaResult.innerText = area;
                perimetroResult.innerText = perimetro;
                datos = `longitud=${longitud}\nancho=${ancho}`;
                sendCalculationData('rectángulo', datos, area, perimetro);
            } else {
                areaResult.innerText = "Invalid input";
                perimetroResult.innerText = "Invalid input";
            }
            break;
        case "triangle":
            var lado1 = parseFloat(document.getElementById("triangleLado1").value);
            var lado2 = parseFloat(document.getElementById("triangleLado2").value);
            var lado3 = parseFloat(document.getElementById("triangleLado3").value);
            if (!isNaN(lado1) && lado1 > 0 && !isNaN(lado2) && lado2 > 0 && !isNaN(lado3) && lado3 > 0) {
                var s = (lado1 + lado2 + lado3) / 2;
                area = Math.sqrt(s * (s - lado1) * (s - lado2) * (s - lado3)).toFixed(2);
                perimetro = (lado1 + lado2 + lado3).toFixed(2);
                areaResult.innerText = area;
                perimetroResult.innerText = perimetro;
                const datos = `lado1=${lado1}\nlado2=${lado2}\nlado3=${lado3}`;
                sendCalculationData('triángulo', datos, area, perimetro);
            } else {
                areaResult.innerText = "Invalid input";
                perimetroResult.innerText = "Invalid input";
            }
            break;
        case "circle":
            var radio = parseFloat(document.getElementById("circleRadius").value);
            if (!isNaN(radio) && radio > 0) {
                area = (Math.PI * radio * radio).toFixed(2);
                perimetro = (2 * Math.PI * radio).toFixed(2);
                areaResult.innerText = area;
                perimetroResult.innerText = perimetro;
                datos = `radio=${radio}`;
                sendCalculationData('círculo', datos, area, perimetro);
            } else {
                areaResult.innerText = "Invalid input";
                perimetroResult.innerText = "Invalid input";
            }
            break;
        default:
            areaResult.innerText = "N/A";
            perimetroResult.innerText = "N/A";
    }
}

function sendCalculationData(tipoFigura, datos, area, perimetro) {
    fetch('/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            tipo_figura: tipoFigura,
            datos: datos,          
            resultados: { area, perimetro }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Mensaje de éxito
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

