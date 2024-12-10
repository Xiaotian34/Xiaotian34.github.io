document.addEventListener('DOMContentLoaded', function () {
  // Manejo del formulario de registro
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
      registerForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const name = document.getElementById('register-name').value;
          const email = document.getElementById('register-email').value;
          const password = document.getElementById('register-password').value;
          const confirmPassword = document.getElementById('register-confirm-password').value;

          if (password !== confirmPassword) {
              alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
              return;
          }

          const users = JSON.parse(localStorage.getItem('users')) || [];
          const userExists = users.some(user => user.email === email);

          if (userExists) {
              alert('El correo ya está registrado. Usa otro correo o inicia sesión.');
              return;
          }

          users.push({ name, email, password });
          localStorage.setItem('users', JSON.stringify(users));

          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          window.location.href = 'login.html';
      });
  }

  // Manejo del formulario de inicio de sesión
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
          event.preventDefault();

          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;

          const users = JSON.parse(localStorage.getItem('users')) || [];
          const user = users.find(user => user.email === email && user.password === password);

          if (!user) {
              alert('Correo o contraseña incorrectos. Inténtalo de nuevo.');
              return;
          }

          alert(`Bienvenido, ${user.name}!`);
          window.location.href = '../index.html';
      });
  }
});
