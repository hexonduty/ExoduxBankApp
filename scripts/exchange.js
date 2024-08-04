document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'Z05JIPVE1W07C9F2';
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'FB', 'TSLA', 'NFLX', 'NVDA', 'BABA', 'AMD']; // Eklemek istediğiniz semboller burada
    const promises = symbols.map(symbol => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => ({
                symbol,
                data: data['Time Series (1min)']
            }));
    });

    Promise.all(promises)
        .then(results => {
            const datasets = [];
            const stockLabels = new Set();

            results.forEach(result => {
                const timeSeries = result.data;
                const stockData = [];

                for (let time in timeSeries) {
                    stockLabels.add(new Date(time));
                    stockData.push({ x: new Date(time), y: parseFloat(timeSeries[time]['1. open']) });
                }

                stockData.sort((a, b) => a.x - b.x); // Tarihe göre sıralama

                datasets.push({
                    label: `${result.symbol} Anlık Fiyat`,
                    data: stockData,
                    borderColor: getRandomColor(),
                    borderWidth: 2,
                    pointRadius: 1,
                    fill: false
                });
            });

            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from(stockLabels).sort((a, b) => a - b), // Tarihe göre sıralama
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Stock Prices Over Time',
                            font: {
                                size: 24
                            },
                            padding: {
                                top: 20,
                                bottom: 30
                            }
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute',
                                tooltipFormat: 'YYYY-MM-DD HH:mm'
                            },
                            title: {
                                display: true,
                                text: 'Time',
                                font: {
                                    size: 16
                                }
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)',
                                font: {
                                    size: 16
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}