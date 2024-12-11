import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCdKEaKsiNhwweEvOLUe0ARvPOMBJ2rVn0",
    authDomain: "pastafarismo-2a4cd.firebaseapp.com",
    databaseURL: "https://pastafarismo-2a4cd-default-rtdb.firebaseio.com",
    projectId: "pastafarismo-2a4cd",
    storageBucket: "pastafarismo-2a4cd.firebasestorage.app",
    messagingSenderId: "89636997884",
    appId: "1:89636997884:web:3ce658421916cf6cf6e579"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
                return;
            }

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                alert(`Registro exitoso, bienvenido ${name}!`);
                window.location.href = 'login.html';
            } catch (error) {
                alert('Error en el registro: ' + error.message);
            }
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Inicio de sesión exitoso.');
                window.location.href = '../index.html';
            } catch (error) {
                alert('Error al iniciar sesión: ' + error.message);
            }
        });
    }

    const formularioNav = document.querySelector('.menu2');

    const renderLogoutButton = () => {
        formularioNav.innerHTML = `
            <li><a href="cesta.html">Ver Cesta</a></li>
            <li><a href="favoritos.html">Ver Favoritos</a></li>
            <li>
                <button id="logout-btn" style="background-color: red; color: white; border: none; padding: 10px 15px; cursor: pointer;">
                    Cerrar Sesión
                </button>
            </li>
        `;
        document.getElementById('logout-btn').addEventListener('click', async () => {
            try {
                await signOut(auth);
                alert('Sesión cerrada exitosamente.');
                window.location.href = 'home.html';
            } catch (error) {
                alert('Error al cerrar sesión: ' + error.message);
            }
        });
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            renderLogoutButton();
        } else {
            formularioNav.innerHTML = `
                <li><a href="login.html">Iniciar sesión</a></li>
                <li><a href="registro.html">Registrarse</a></li>
            `;
        }
    });
});

document.querySelector('.hamburger input').addEventListener('change', function () {
    const menu = document.querySelector('.menu2');
    if (this.checked) {
        menu.style.right = '0';
    } else {
        menu.style.right = '-250px';
    }
});

window.addEventListener('DOMContentLoaded', function () {
    const cookieNotification = document.getElementById('cookie-notification');
    const acceptButton = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookies-accepted')) {
        cookieNotification.style.display = 'block';
    }

    acceptButton.addEventListener('click', function () {
        localStorage.setItem('cookies-accepted', 'true');
        cookieNotification.style.display = 'none';
    });
});
