document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los botones y listas
    const cartItemsList = document.getElementById('cart-items');
    const favoritesList = document.getElementById('favorites-list');

    // Obtener los eventos de la lista
    const events = document.querySelectorAll('.event-item');

    // Función para guardar datos en LocalStorage de forma segura
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Función para cargar datos desde LocalStorage de forma segura
    function loadFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Cargar favoritos y carrito desde LocalStorage
    const favorites = loadFromLocalStorage('favorites');
    const cart = loadFromLocalStorage('cart');

    // Función para actualizar la lista de la cesta
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        cart.forEach(eventId => {
            const eventName = document.querySelector(`.event-item[data-id="${eventId}"] h3`).textContent;
            const li = document.createElement('li');
            li.textContent = eventName;
            cartItemsList.appendChild(li);
        });
    }

    // Función para actualizar la lista de favoritos
    function updateFavoritesDisplay() {
        favoritesList.innerHTML = '';
        favorites.forEach(eventId => {
            const eventName = document.querySelector(`.event-item[data-id="${eventId}"] h3`).textContent;
            const li = document.createElement('li');
            li.textContent = eventName;
            favoritesList.appendChild(li);
        });
    }

    // Inicializar listas
    updateCartDisplay();
    updateFavoritesDisplay();

    // Asignar eventos a los botones
    events.forEach(event => {
        const eventId = event.dataset.id;
        const eventName = event.querySelector('h3').textContent;

        // Botón de añadir a favoritos
        event.querySelector('.add-to-favorites').addEventListener('click', () => {
            if (!favorites.includes(eventId)) {
                favorites.push(eventId);
                saveToLocalStorage('favorites', favorites);
                updateFavoritesDisplay();
            }
        });

        // Botón de añadir a la cesta
        event.querySelector('.add-to-cart').addEventListener('click', () => {
            if (!cart.includes(eventId)) {
                cart.push(eventId);
                saveToLocalStorage('cart', cart);
                updateCartDisplay();
            }
        });
    });

    // Botón de compra
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('La cesta está vacía.');
            return;
        }
        alert('Compra realizada con éxito');
        localStorage.removeItem('cart');
        cart.length = 0;
        updateCartDisplay();
    });
});
