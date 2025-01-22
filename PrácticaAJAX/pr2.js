// URLs de las APIs
const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';


document.addEventListener('DOMContentLoaded', () => {
  // Captura los elementos necesarios del DOM
  const numsecsInput = document.getElementById('numsecs');
  const userInput = document.getElementById('user');
  const executeButton = document.querySelector('button');

  const idSpan = document.getElementById('id');
  const emailSpan = document.getElementById('email');
  const nameSpan = document.getElementById('name');
  const statusSpan = document.getElementById('status');

  // Limpia todos los campos de salida
  function clearFields() {
    idSpan.textContent = '';
    emailSpan.textContent = '';
    nameSpan.textContent = '';
    statusSpan.textContent = '';
  }

  // Maneja el clic en el botón
  executeButton.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Limpia los campos de salida
    clearFields();

    const numsecs = numsecsInput.value;
    const user = userInput.value;

    // Valida si el número de usuario es válido
    if (!user || isNaN(user) || user < 1 || user > 12) {
      statusSpan.textContent = 'ERROR 404';
      return;
    }

    // Primera solicitud: obtención del usuario
    fetch(`${BASE_URL}${user}?delay=${numsecs}`)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Convierte la respuesta a JSON
        } else {
          throw new Error(`Error en la obtención del usuario, código: ${response.status}`);
        }
      })
      .then((data) => {
        // Rellena los campos de "Obtención usuario"
        const userData = data.data;
        idSpan.textContent = userData.id;
        emailSpan.textContent = userData.email;

        // Segunda solicitud: envío del usuario mediante POST
        return fetch(POSTMAN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Convierte la respuesta a JSON
        } else {
          throw new Error(`Error en la creación del usuario, código: ${response.status}`);
        }
      })
      .then((postData) => {
        // Rellena los campos de "Creación usuario"
        const postedUser = postData.json;
        nameSpan.textContent = postedUser.first_name;

        // Indica que la operación fue exitosa
        statusSpan.textContent = '200';
      })
      .catch((error) => {
        // Maneja errores y muestra el estado
        statusSpan.textContent = error.message;
      });
  });
});
