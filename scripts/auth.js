// Importar las funciones desde firebase-config.js
import { auth, database } from './firebase-config.js'; // Asegúrate de la ruta correcta

// Obtener referencias a los formularios
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Función para manejar el registro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Guarda la fecha de nacimiento en Realtime Database
      set(ref(database, 'users/' + user.uid), {
        email: user.email,
        dob: dob,
        registrationDate: new Date().toISOString()
      });

      console.log('Usuario registrado:', user);
      alert('Registro exitoso');
      
      // Redirige a la página de inicio de sesión después del registro
      window.location.href = 'login.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert('Error: ' + errorMessage);
    });
});

// Función para manejar el inicio de sesión
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Guarda la hora de acceso al sistema en Realtime Database
      set(ref(database, 'loginHistory/' + user.uid), {
        loginTime: new Date().toISOString()
      });

      console.log('Usuario logueado:', user);
      alert('Inicio de sesión exitoso');
      
      // Redirige a la página de bienvenida después del inicio de sesión
      window.location.href = 'welcome.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert('Error: ' + errorMessage);
    });
});
