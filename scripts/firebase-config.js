// Importar funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRUSl_9p51NyvkpYQyxrtIDPLB40QEEX8",
    authDomain: "pastafarismo-interfaces.firebaseapp.com",
    databaseURL: "https://pastafarismo-interfaces-default-rtdb.firebaseio.com",
    projectId: "pastafarismo-interfaces",
    storageBucket: "pastafarismo-interfaces.firebasestorage.app",
    messagingSenderId: "482024258066",
    appId: "1:482024258066:web:a56131e8c430d8e81ff6cb",
    measurementId: "G-7DTZX8JZXF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Exportar los objetos para usarlos en otros archivos
export { auth, database };
