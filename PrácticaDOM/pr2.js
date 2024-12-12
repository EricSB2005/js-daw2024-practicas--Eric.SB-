    // Lista de palabras desordenadas
    const palabras = [
        "Gato", "Perro", "Elefante", "Manzana", "Plátano", 
        "Zapato", "Coche", "Avión", "Pelota", "Árbol"
    ];

    // Función para mostrar la lista en HTML
    function displayList(lista) {
        const ul = document.getElementById('listaPalabras');
        ul.innerHTML = ''; // Limpiar la lista actual
        lista.forEach(palabra => {
            const li = document.createElement('li');
            li.textContent = palabra;
            ul.appendChild(li);
        });
    }

    // Mostrar la lista inicial
    displayList(palabras);

    // Preguntar al usuario después de 3 segundos si quiere ordenar la lista
    setTimeout(() => {
        const ordenarLista = confirm('¿Quieres ordenar la lista alfabéticamente?');
        if (ordenarLista) {
            // Ordenar la lista alfabéticamente
            const listaOrdenada = [...palabras].sort();
            displayList(listaOrdenada);
        }
    }, 3000); // 3 segundos