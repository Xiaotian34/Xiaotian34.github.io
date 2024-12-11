document.addEventListener('DOMContentLoaded', function () {
    const cartItemsList = document.getElementById('cart-items');
    const favoritesList = document.getElementById('favorites-list');

    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function loadFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    const favorites = loadFromLocalStorage('favorites');
    const cart = loadFromLocalStorage('cart');

    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        cart.forEach(eventId => {
            const eventName = document.querySelector(`.event-item[data-id="${eventId}"] h3`).textContent;
            const li = document.createElement('li');
            li.textContent = eventName;
            cartItemsList.appendChild(li);
        });
    }

    function updateFavoritesDisplay() {
        favoritesList.innerHTML = '';
        favorites.forEach(eventId => {
            const eventName = document.querySelector(`.event-item[data-id="${eventId}"] h3`).textContent;
            const li = document.createElement('li');
            li.textContent = eventName;
            favoritesList.appendChild(li);
        });
    }

    updateCartDisplay();
    updateFavoritesDisplay();

    const events = document.querySelectorAll('.event-item');

    events.forEach(event => {
        const eventId = event.dataset.id;
        const eventName = event.querySelector('h3').textContent;

        event.querySelector('.add-to-favorites').addEventListener('click', () => {
            if (!favorites.includes(eventId)) {
                favorites.push(eventId);
                saveToLocalStorage('favorites', favorites);
                updateFavoritesDisplay();
            }
        });

        event.querySelector('.add-to-cart').addEventListener('click', () => {
            if (!cart.includes(eventId)) {
                cart.push(eventId);
                saveToLocalStorage('cart', cart);
                updateCartDisplay();
            }
        });
    });

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
