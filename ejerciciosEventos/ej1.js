
document.addEventListener('keydown', function(event) {
    // Comprueba si pulsamos a la vez ALT y F12
    if (event.altKey && event.key === 'F12') {
        // Evita que el navegador ejecute la acción predeterminada para F12 (abrir herramientas de desarrollo)
        event.preventDefault();
        
        // Cambia el fondo de la web
        document.getElementById('imagen').style.backgroundImage = 'url("./imgOjo.jpg")';
    }
});