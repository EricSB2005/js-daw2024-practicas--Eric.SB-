    checkCookie();

    // Función para obtener el valor de una cookie por su nombre
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    return "";
}
    //Función para establecer una cookie
    function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }


    // Función para manejar la carga de la página
    function checkCookie() {
        let username = getCookie("username");
        if (!username=="") {
            // Si ya existe la cookie, mostrar mensaje de bienvenida
            document.getElementById("saludo").innerHTML = "Bienvenido, " + username ;
            document.getElementById("formulario").style.display = "none"; // Ocultar el formulario
        } else {
            // Si no existe la cookie, mostrar el formulario
            document.getElementById("saludo").style.display = "none"; // Ocultar el mensaje
            document.getElementById("formulario").style.display = "block"; // Mostrar el formulario
        }
    }

    // Función para guardar el nombre en la cookie
    function guardarNombre() {
        let name = document.getElementById("name").value;
        if (!name=="") {
            setCookie("username", name, 7); // Guardar cookie por 7 días
            location.reload(); // Recargar la página para aplicar los cambios
        } else {
            alert("Por favor ingresa tu nombre.");
        }
    }

    // Llamar a checkCookie cuando la página se carga
    window.onload = checkCookie;