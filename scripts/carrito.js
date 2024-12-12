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

    function showMessage(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    function updateCartDisplay() {
        if (!cartItemsList) return;
        cartItemsList.innerHTML = '';
        cart.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event.name;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Quitar';
            removeButton.className = 'remove-cart';
            removeButton.addEventListener('click', () => {
                removeFromCart(event.id);
            });

            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
        });
    }

    function updateFavoritesDisplay() {
        if (!favoritesList) return;
        favoritesList.innerHTML = '';
        favorites.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event.name;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Quitar';
            removeButton.className = 'remove-favorite';
            removeButton.addEventListener('click', () => {
                removeFromFavorites(event.id);
            });

            li.appendChild(removeButton);
            favoritesList.appendChild(li);
        });
    }

    function removeFromFavorites(eventId) {
        const eventIndex = favorites.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            const removedEvent = favorites.splice(eventIndex, 1)[0];
            saveToLocalStorage('favorites', favorites);
            updateFavoritesDisplay();
            showMessage(`"${removedEvent.name}" eliminado de Favoritos.`, 'error');
        }
    }

    function removeFromCart(eventId) {
        const eventIndex = cart.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            const removedEvent = cart.splice(eventIndex, 1)[0];
            saveToLocalStorage('cart', cart);
            updateCartDisplay();
            showMessage(`"${removedEvent.name}" eliminado de la Cesta.`, 'error');
        }
    }

    const events = document.querySelectorAll('.event-item');

    events.forEach(event => {
        const eventId = event.dataset.id;
        const eventName = event.querySelector('h3').textContent;

        event.querySelector('.add-to-favorites').addEventListener('click', () => {
            if (!favorites.some(e => e.id === eventId)) {
                favorites.push({ id: eventId, name: eventName });
                saveToLocalStorage('favorites', favorites);
                updateFavoritesDisplay();
                showMessage(`"${eventName}" añadido a Favoritos.`);
            }
        });

        event.querySelector('.add-to-cart').addEventListener('click', () => {
            if (!cart.some(e => e.id === eventId)) {
                cart.push({ id: eventId, name: eventName });
                saveToLocalStorage('cart', cart);
                updateCartDisplay();
                showMessage(`"${eventName}" añadido a la Cesta.`);
            }
        });
    });

    document.getElementById('checkout')?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('La cesta está vacía.');
            return;
        }
        alert('Compra realizada con éxito');
        localStorage.removeItem('cart');
        cart.length = 0;
        updateCartDisplay();
    });

    updateCartDisplay();
    updateFavoritesDisplay();
});
