function showFields() {
    var shape = document.getElementById("shape").value;
    var fields = document.querySelectorAll(".fields");
    fields.forEach(function(field) {
        field.classList.remove("active");
    });
    document.getElementById(shape + "Fields").classList.add("active");
}

function calculate() {
    var shape = document.getElementById("shape").value;
    var areaResult = document.getElementById("areaResult");
    var perimeterResult = document.getElementById("perimeterResult");
    var side, length, width, lado1, lado2,lado3,s, radius;
    switch (shape) {
        case "square":
            side = parseFloat(document.getElementById("squareSide").value);
            areaResult.innerText = side * side;
            perimeterResult.innerText = 4 * side;
            break;
        case "rectangle":
            length = parseFloat(document.getElementById("rectangleLength").value);
            width = parseFloat(document.getElementById("rectangleWidth").value);
            areaResult.innerText = length * width;
            perimeterResult.innerText = 2 * (length + width);
            break;
        case "triangle":
            lado1 = parseFloat(document.getElementById("triangleLado1").value);
            lado2 = parseFloat(document.getElementById("triangleLado2").value);
            lado3 = parseFloat(document.getElementById("triangleLado3").value);
            s= (lado1+lado2+lado3/2);           
            areaResult.innerText = 0.5*(s*(s-lado1)*(s-lado2)*(s-lado3));
            perimeterResult.innerText = s*2;
            break;
        case "circle":
            radius = parseFloat(document.getElementById("circleRadius").value);
            areaResult.innerText = Math.PI * radius * radius;
            perimeterResult.innerText = 2 * Math.PI * radius;
            break;
        default:
            areaResult.innerText = "N/A";
            perimeterResult.innerText = "N/A";
    }
}
