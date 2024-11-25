const iniciarAplicacion = () => {
    let palabras = [];

    // Pedir palabras al usuario
    while (true) {
        let palabra = prompt("Ingresa una palabra (deja vacío o cancela para terminar):");
        
        if (!palabra) {
            break; // Si no se ingresa ninguna palabra, salir del ciclo
        }

        if (!palabras.includes(palabra)) {
            palabras.push(palabra); // Agregar solo si no está repetida
        }
    }

    // Ordenar de Z a A
    palabras.sort((a, b) => b.localeCompare(a));

    // Mostrar las palabras ordenadas
    document.getElementById("resultado").innerHTML = `<h2>Resultado:</h2><p>`+palabras.join(", ")+`</p>`;
};