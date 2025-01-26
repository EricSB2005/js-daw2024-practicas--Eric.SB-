 // Función para crear una promesa que se resuelve después de un retraso
 function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para iniciar la cuenta regresiva
async function iniciarCuentaRegresiva() {
    let cuentaRegresiva = 5;
    const elementoTimer = document.getElementById('timer');

    while (cuentaRegresiva > 0) {
        elementoTimer.textContent = `Cuenta regresiva: ${cuentaRegresiva} segundos`;
        await delay(1000);
        cuentaRegresiva--;
    }

    elementoTimer.textContent = "Cuenta regresiva: 0 segundos";
    mostrarNotificacion();
}

// Función para mostrar la notificación
function mostrarNotificacion() {
    const elementoNotificacion = document.getElementById('alert');
    elementoNotificacion.style.display = 'block';
    elementoNotificacion.addEventListener('click', () => {
        document.getElementById('media-wrapper').style.display = 'block';
        elementoNotificacion.style.display = 'none';
    });
}

// Obtener referencias al reproductor de video y al contenedor de información
const reproductorVideo = document.getElementById('media-player');
const informacionVideo = document.getElementById('media-info');

// Alternar entre reproducir y pausar el video al hacer clic izquierdo
reproductorVideo.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir comportamientos predeterminados
    if (reproductorVideo.paused || reproductorVideo.ended) {
        reproductorVideo.play();
    } else {
        reproductorVideo.pause();
    }
});

// Mostrar la duración total del video al hacer clic derecho
reproductorVideo.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const duracion = reproductorVideo.duration;
    const minutos = Math.floor(duracion / 60);
    const segundos = Math.floor(duracion % 60);
    informacionVideo.textContent = `Duración total del video: ${minutos} minutos y ${segundos} segundos`;
});

// Iniciar la cuenta regresiva al cargar la página
iniciarCuentaRegresiva();