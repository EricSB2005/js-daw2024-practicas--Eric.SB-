//Declarammos los array
let miArray=[];


//Rellenamos el array "miArray"
for(let i=1;i<=49;i++){
    miArray.push(i);
}

//Hacemo el siguiente bucle 50 veces
for (let i = 0; i < 50; i++) {
    let grupos6 = [];  // Array para almacenar una combinación de 6 números

    // Creamos una copia temporal del array para cada combinación
    let miArrayTemp = [...miArray];

    // Seleccionamos 6 números aleatorios para la combinación
    for (let j = 0; j < 6; j++) {
        // Seleccionamos un índice aleatorio dentro del array
        let nAleatorio = Math.floor(Math.random() * miArrayTemp.length);

        // Añadimos el número aleatorio a la combinación
        grupos6.push(miArrayTemp[nAleatorio]);

        // Eliminamos el número seleccionado del array temporal
        miArrayTemp.splice(nAleatorio, 1);
    }

    console.log(grupos6);

}

