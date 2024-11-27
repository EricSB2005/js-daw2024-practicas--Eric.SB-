//Creamos el array
let miArray = []; 

//lo recorremos y lo llenamos 10000
for(let i=1; i<10000; i++){
    numAleatorio= Math.floor(Math.random()*(10-1+1)+1);
    miArray.push(numAleatorio);
}


for(let i=1;i<=10;i++){

    miNuevaArray = new Array();
    miNuevaArray= miArray.filter(function(num) {  //Filtramos "miArray" para obtener un array con una cantidad x del número i
        return num == i; 
        }); 

    console.log(i+": "+miNuevaArray.length) // imprimimos por pantalla el tamaño de ese array de números i que será la cantidad de veces que haya salido
}

