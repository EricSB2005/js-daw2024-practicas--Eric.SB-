// Constructor para crear un objeto Cuadro
function Cuadro(w, h) {
    // Validación de dimensiones
    this.ancho = (typeof w === 'number' && w > 0) ? w : 1;
    this.alto = (typeof h === 'number' && h > 0) ? h : 1;

    // Cambiar las dimensiones del cuadro
    this.cambiarDimensiones = function(nw, nh) {
        if (nw > 0) this.ancho = nw;
        if (nh > 0) this.alto = nh;
    };

    // Calcular el área del cuadro
    this.calcularArea = function() {
        return this.ancho * this.alto;
    };

    // Crear una copia del cuadro
    this.copia = function() {
        return new Cuadro(this.ancho, this.alto);
    };

    // Comparar el área de este cuadro con otro
    this.comparar = function(otro) {
        const area1 = this.calcularArea();
        const area2 = otro.calcularArea();
        return area1 > area2 ? "mayor" : area1 < area2 ? "menor" : "igual";
    };
}

// Crear cuadros de ejemplo
let c1 = new Cuadro(5, 6);
let c2 = new Cuadro(4, 2);
let c3 = new Cuadro(3, 8);

// Mostrar áreas
console.log("Área c1:", c1.calcularArea()); 
console.log("Área c2:", c2.calcularArea()); 

// Cambiar las dimensiones de c1
c1.cambiarDimensiones(10, 3);
console.log("Nueva área c1:", c1.calcularArea()); 

// Copiar c1
let copiaC1 = c1.copia();
console.log("Área copia de c1:", copiaC1.calcularArea()); 

// Comparar c1 con c2 y c3
console.log("Comparar c1 con c2:", c1.comparar(c2)); 
console.log("Comparar c1 con c3:", c1.comparar(c3)); 
