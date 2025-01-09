    // Inventario inicial de productos
    const products = {
        1: { name: "Laptop", price: 1000, stock: 5 },
        2: { name: "Mouse", price: 20, stock: 10 },
        3: { name: "Keyboard", price: 50, stock: 0 },
    };
  
  // 1. Función para validar si el producto tiene stock suficiente
  function verifyStock(itemId, amount) {
    return new Promise((resolve, reject) => {
      const item = products[itemId];
      if (!item) {
        reject("No se encontró el producto con el ID "+itemId);
      } else if (item.stock >= amount) {
        resolve("Hay stock suficiente para el producto "+itemId);
      } else {
        reject("No hay stock suficiente para el producto "+itemId);
      }
    });
  }
  
  // 2. Función para obtener el precio total del pedido
  function computeTotal(itemId, amount) {
    return new Promise((resolve, reject) => {
      const item = products[itemId];
      if (!item) {
        reject("El producto con ID "+itemId+" no existe en el sistema");
      } else {
        const totalCost = item.price * amount;
        resolve("El costo total para "+amount+" unidades de "+item.name+" es: "+totalCost);
      }
    });
  }
  
  // 3. Función para finalizar la compra
  function finalizeOrder(itemId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Orden confirmada para el producto "+itemId);
      }, 2000);
    });
  }
  
  // 4. Ejecución del flujo de compra
  function handleOrder(itemId, amount) {
    console.log("Iniciando procesamiento del pedido...");
    verifyStock(itemId, amount)
      .then((stockMsg) => {
        console.log(stockMsg);
        return computeTotal(itemId, amount); // Obtener el total si hay stock
      })
      .then((totalMsg) => {
        console.log(totalMsg);
        return finalizeOrder(itemId); // Confirmar el pedido si todo es correcto
      })
      .then((confirmationMsg) => {
        console.log(confirmationMsg);
        console.log("Pedido completado exitosamente.");
      })
      .catch((error) => {
        console.error("Hubo un problema con el pedido:", error);
      });
  }
  
  // Pruebas de pedidos
  handleOrder(1, 3); // Compra de 3 unidades de Laptop
  handleOrder(3, 1); // Intento de compra de Keyboard (sin stock)
  handleOrder(2, 11); // Pedido de 11 unidades de Mouse (stock insuficiente)
  