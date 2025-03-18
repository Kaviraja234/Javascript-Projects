// script.js
const canvas = document.getElementById('populationChart');
const ctx = canvas.getContext('2d');
const populationInput = document.getElementById('populationInput');
const addPopulationButton = document.getElementById('addPopulation');
const clearChartButton = document.getElementById('clearChart');

let populations = [];
let barWidth = 50;
let barSpacing = 10;
let startX = 30;
let startY = canvas.height - 30;

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bars
    for (let i = 0; i < populations.length; i++) {
        let barHeight = populations[i] / 1000; // Scale down for better visualization
        ctx.fillStyle = '#007bff';
        ctx.fillRect(startX + i * (barWidth + barSpacing), startY - barHeight, barWidth, barHeight);

        // Draw population value
        ctx.fillStyle = '#000';
        ctx.fillText(populations[i], startX + i * (barWidth + barSpacing) + barWidth / 2 - 10, startY - barHeight - 5);
    }

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, 30);
    ctx.lineTo(canvas.width - 30, 30);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw axis labels
    ctx.fillText('Population', canvas.width / 2, 20);
    ctx.fillText('Cities', canvas.width / 2, canvas.height - 10);
}

addPopulationButton.addEventListener('click', () => {
    const population = parseInt(populationInput.value);
    if (!isNaN(population) && population >= 0) {
        populations.push(population);
        drawChart();
        populationInput.value = '';
    } else {
        alert('Please enter a valid population number.');
    }
});

clearChartButton.addEventListener('click', () => {
    populations = [];
    drawChart();
});

// Initial draw
drawChart();