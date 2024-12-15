// Añadir el método 'calcularMedia' al prototipo de Array
Array.prototype.calcularMedia = function() {
    // Comprobar si el array está vacío
    if (this.length === 0) {
        return 0; // Retorna 0 si el array está vacío
    }
    
    // Usar reduce para sumar todos los elementos del array
    const sumaTotal = this.reduce((acumulador, elementoActual) => acumulador + elementoActual, 0);
    
    // Calcular la media dividiendo la suma total entre el número de elementos
    return sumaTotal / this.length;
};

// Ejemplos de uso y pruebas

// Array con números enteros
let numerosEnteros = [15, 25, 35, 45, 55];
console.log("La media de [15, 25, 35, 45, 55] es:", numerosEnteros.calcularMedia()); // 35

// Array con un solo número
let soloUno = [7];
console.log("La media de [7] es:", soloUno.calcularMedia()); // 7

// Array vacío
let arrayVacio = [];
console.log("La media de un array vacío es:", arrayVacio.calcularMedia()); // 0

// Array con números negativos
let numerosNegativos = [-8, -18, -28, -38];
console.log("La media de [-8, -18, -28, -38] es:", numerosNegativos.calcularMedia()); // -23

// Array con números decimales
let numerosDecimales = [2.75, 3.25, 4.75, 5.25];
console.log("La media de [2.75, 3.25, 4.75, 5.25] es:", numerosDecimales.calcularMedia()); // 4.25