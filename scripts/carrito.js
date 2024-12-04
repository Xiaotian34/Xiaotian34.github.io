document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los botones y listas
    const cartItemsList = document.getElementById('cart-items');
    const favoritesList = document.getElementById('favorites-list');

    // Obtener los eventos de la lista
    const events = document.querySelectorAll('.event-item');

    // Cargar los datos guardados en LocalStorage
    loadFavorites();
    loadCart();

    // Función para añadir un evento a la cesta
    function addToCart(eventId, eventName) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!cart.includes(eventId)) {
            cart.push(eventId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(eventName);
        }
    }

    // Función para añadir un evento a los favoritos
    function addToFavorites(eventId, eventName) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(eventId)) {
            favorites.push(eventId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesDisplay(eventName);
        }
    }

    // Actualizar la vista de la cesta
    function updateCartDisplay(eventName) {
        const li = document.createElement('li');
        li.textContent = eventName;
        cartItemsList.appendChild(li);
    }

    // Actualizar la vista de favoritos
    function updateFavoritesDisplay(eventName) {
        const li = document.createElement('li');
        li.textContent = eventName;
        favoritesList.appendChild(li);
    }

    // Cargar favoritos desde LocalStorage
    function loadFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.forEach(eventId => {
            const eventName = document.querySelector(`.event-item[data-id="${eventId}"] h3`).textContent;
            updateFavoritesDisplay(eventName);
        });
    }

    // Cargar la cesta desde LocalStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(eventId => {
            const eventName = document.querySelector(`.event-item[data-id="${eventId}"] h3`).textContent;
            updateCartDisplay(eventName);
        });
    }

    // Asignar eventos a los botones de cada evento
    events.forEach(event => {
        const eventId = event.getAttribute('data-id');
        const eventName = event.querySelector('h3').textContent;

        // Botón de añadir a favoritos
        const favoriteButton = event.querySelector('.add-to-favorites');
        favoriteButton.addEventListener('click', () => {
            addToFavorites(eventId, eventName);
        });

        // Botón de añadir a la cesta
        const cartButton = event.querySelector('.add-to-cart');
        cartButton.addEventListener('click', () => {
            addToCart(eventId, eventName);
        });
    });

    // Manejar el proceso de compra (simulación)
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', () => {
        alert('Compra realizada con éxito');
        localStorage.removeItem('cart'); // Vaciar la cesta después de la compra
        cartItemsList.innerHTML = ''; // Limpiar la lista de la cesta
    });
});
