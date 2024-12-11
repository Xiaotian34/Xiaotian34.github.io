document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([-9.425, 147.204], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const events = [
        {
            title: 'Concierto de Pasta',
            location: 'Sala de conciertos PastaCity',
            coordinates: [-9.425, 147.208]
        },
        {
            title: 'Fiesta de Pastafarismo',
            location: 'Club PastaDream',
            coordinates: [-9.429, 147.204]
        },
        {
            title: 'Conferencia de Fideísmo',
            location: 'Aula Pastafari',
            coordinates: [-9.421, 147.210]
        }
    ];

    events.forEach(event => {
        L.marker(event.coordinates)
            .addTo(map)
            .bindPopup(`<b>${event.title}</b><br>${event.location}`);
    });
});
