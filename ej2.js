    let palabras = [];

    // Función para agregar palabras al array
    function agregarPalabra() {
        let palabra = prompt("Introduce una palabra:");

        // Si el usuario cancela o deja vacío, salimos de la función
        if (palabra === null || palabra === "") {
            mostrarResultados();
            return;
        }

        // Añadir palabras al array
        palabras.push(palabra);
        agregarPalabra(); // se vuelve a llamar de forma recursiva para seguir agregando palabras
    }

    // Función que cuenta las palabras y muestra los resultados
    function mostrarResultados() {
        let mapa = contarPalabras(palabras);
        let resultadoDiv = document.getElementById("resultado");

        resultadoDiv.innerHTML = "<h2>Resultados:</h2>";
        
        for (let [palabra, cantidad] of mapa.entries()) {
            resultadoDiv.innerHTML += `<p><strong>`+palabra+`: </strong>`+cantidad+`</p>`;
        }
    }

    // Función para contar las palabras
    function contarPalabras(array) {
        let mapa = new Map();

        for (let palabra of array) {
            if (mapa.has(palabra)) {
                mapa.set(palabra, mapa.get(palabra) + 1);
            } else {
                mapa.set(palabra, 1);
            }
        }

        return mapa;
    }


    