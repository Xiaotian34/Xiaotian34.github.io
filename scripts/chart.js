document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('pastafarian-stats').getContext('2d');

    // Datos ficticios
    const data = {
        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
        datasets: [{
            label: 'Miembros Pastafarianos (en miles)',
            data: [10, 15, 25, 35, 45, 55, 70, 85],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(123, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(201, 203, 207, 1)',
                'rgba(123, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Configuración del gráfico
    const config = {
        type: 'line', // Tipo de gráfico cambiado a 'bar'
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    enabled: true,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Año',
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Número de Miembros (en miles)',
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10 // Controla el intervalo entre los números del eje Y
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true,
        }
    };

    // Crear gráfico
    new Chart(ctx, config);
});