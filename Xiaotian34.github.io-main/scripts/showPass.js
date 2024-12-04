document.getElementById('show-password').addEventListener('change', function() {
    var passwordField = document.getElementById('password');
    var confirmPasswordField = document.getElementById('confirm-password');
    if (this.checked) {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
    }
});
