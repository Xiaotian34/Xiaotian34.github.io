document.addEventListener('DOMContentLoaded', function() {
    // Asegúrate de que el formulario tiene el ID correcto
    const form = document.getElementById('register-form');
    
    form.addEventListener('submit', function(event) {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, vuelve a introducirlas.');
            event.preventDefault(); // Evita el envío del formulario
        }
    });
});
