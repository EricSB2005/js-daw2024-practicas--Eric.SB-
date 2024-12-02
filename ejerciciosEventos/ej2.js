
// Referencias a los elementos del formulario
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submitBtn');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Función de validación para el correo electrónico
function validateEmail() {
    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "El formato del correo debe ser: xxxx@yyyy.zzzz";
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}

// Función de validación para la contraseña
function validatePassword() {
    const passwordValue = passwordInput.value;
    if (passwordValue.length < 8 || passwordValue.length > 10) {
        passwordError.textContent = "La contraseña debe tener entre 8 y 10 caracteres.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

// Función para habilitar o deshabilitar el botón de envío
function toggleSubmitButton() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    submitButton.disabled = !(isEmailValid && isPasswordValid);
}

// Event listeners para las validaciones al perder el foco
emailInput.addEventListener('blur', () => {
    validateEmail();
    toggleSubmitButton();
});

passwordInput.addEventListener('blur', () => {
    validatePassword();
    toggleSubmitButton();
});

// Para limpiar los errores cuando el usuario vuelve a editar el campo
emailInput.addEventListener('focus', () => {
    emailError.textContent = "";
});

passwordInput.addEventListener('focus', () => {
    passwordError.textContent = "";
});

// Prevenir el envío del formulario si el botón está deshabilitado
document.getElementById('loginForm').addEventListener('submit', (event) => {
    if (submitButton.disabled) {
        event.preventDefault();
    }
});

