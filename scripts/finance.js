document.addEventListener("DOMContentLoaded", function () {
    let rentData = [];
    let utilitiesData = [];
    let entertainmentData = [];
    let months = [];

    const storedData = JSON.parse(localStorage.getItem("budgetData")) || { rent: [], utilities: [], entertainment: [], months: [] };
    rentData = storedData.rent;
    utilitiesData = storedData.utilities;
    entertainmentData = storedData.entertainment;
    months = storedData.months;

    const userMoneyText = document.getElementById("userMoneyText");
    const modal = document.getElementById("customModal");
    const closeModalButton = document.getElementById("closeModalButton");
    const addMoneyButton = document.getElementById("addMoneyButton");
    const amountInput = document.getElementById("amountInput");
    const openModalButton = document.getElementById("openModalButton");

    function updateChart() {
        var trace1 = {
            x: months,
            y: rentData,
            name: 'Rent',
            type: 'bar',
            marker: {
                color: 'rgb(75, 192, 192)', 
                line: {
                    width: 1,
                    color: 'rgba(0,0,0,0.2)'
                }
            }
        };

        var trace2 = {
            x: months,
            y: utilitiesData,
            name: 'Utilities',
            type: 'bar',
            marker: {
                color: 'rgb(255, 159, 64)', 
                line: {
                    width: 1,
                    color: 'rgba(0,0,0,0.2)'
                }
            }
        };

        var trace3 = {
            x: months,
            y: entertainmentData,
            name: 'Entertainment',
            type: 'bar',
            marker: {
                color: 'rgb(153, 102, 255)', 
                line: {
                    width: 1,
                    color: 'rgba(0,0,0,0.2)'
                }
            }
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            title: {
                text: 'Monthly Budget',
                font: {
                    size: 24,
                    color: '#333'
                }
            },
            xaxis: {
                title: 'Month',
                tickfont: {
                    size: 14,
                    color: '#666'
                },
                titlefont: {
                    size: 16,
                    color: '#333'
                },
                tickangle: -45
            },
            yaxis: {
                title: 'Amount (USD)',
                titlefont: {
                    size: 16,
                    color: '#333'
                },
                tickfont: {
                    size: 14,
                    color: '#666'
                }
            },
            legend: {
                x: 0.5,
                y: -0.2,
                orientation: 'h',
                xanchor: 'center',
                yanchor: 'top',
                bgcolor: 'rgba(255, 255, 255, 0)',
                bordercolor: 'rgba(255, 255, 255, 0)'
            },
            barmode: 'stack',
            bargap: 0.15,
            bargroupgap: 0.1,
            paper_bgcolor: '#f5f5f5',
            plot_bgcolor: '#ffffff',
            margin: {
                t: 60,
                b: 60,
                l: 70,
                r: 30
            }
        };

        Plotly.newPlot('myDiv', data, layout);
    }

    function showModal() {
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function addMoney() {
        const amount = parseFloat(amountInput.value) || 0;
        if (amount > 0) {
            let currentMoney = parseFloat(localStorage.getItem("userMoney")) || 0;
            currentMoney += amount;
            localStorage.setItem("userMoney", currentMoney.toFixed(2));

            if (userMoneyText) {
                userMoneyText.textContent = `Balance: $${currentMoney.toFixed(2)}`;
            }
            closeModal();
        }
    }

    openModalButton.addEventListener("click", showModal);
    closeModalButton.addEventListener("click", closeModal);
    addMoneyButton.addEventListener("click", addMoney);

    const budgetForm = document.getElementById("budget-form");
    if (budgetForm) {
        budgetForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const month = document.getElementById('month').value;
            const rent = parseFloat(document.getElementById('rent').value) || 0;
            const utilities = parseFloat(document.getElementById('utilities').value) || 0;
            const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;

            const totalExpense = rent + utilities + entertainment;

            let currentMoney = parseFloat(localStorage.getItem("userMoney")) || 0;
            currentMoney -= totalExpense;
            localStorage.setItem("userMoney", currentMoney.toFixed(2));

            if(totalExpense > currentMoney){
                alert("You are about to enter the debt!!");
            }

            if (userMoneyText) {
                userMoneyText.textContent = `Balance: $${currentMoney.toFixed(2)}`;
            }

            months.push(month);
            rentData.push(rent);
            utilitiesData.push(utilities);
            entertainmentData.push(entertainment);

            const budgetData = {
                rent: rentData,
                utilities: utilitiesData,
                entertainment: entertainmentData,
                months: months
            };
            localStorage.setItem("budgetData", JSON.stringify(budgetData));

            updateChart();
            budgetForm.reset();
        });
    }

    updateChart();
});
