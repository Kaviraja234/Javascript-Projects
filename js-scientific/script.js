function appendCharacter(character) {
    document.getElementById("display").value += character;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch {
        document.getElementById("display").value = "Error";
    }
}

function calculateSquareRoot() {
    let display = document.getElementById("display");
    display.value = Math.sqrt(parseFloat(display.value));
}

function calculatePower() {
    let base = prompt("Enter base:");
    let exponent = prompt("Enter exponent:");
    if (base !== null && exponent !== null) {
        document.getElementById("display").value = Math.pow(parseFloat(base), parseFloat(exponent));
    }
}

function calculateTrig(func) {
    let value = parseFloat(document.getElementById("display").value);
    let radians = value * (Math.PI / 180); // Convert to radians
    document.getElementById("display").value = Math[func](radians).toFixed(6);
}

function calculateLog() {
    let display = document.getElementById("display");
    display.value = Math.log10(parseFloat(display.value)).toFixed(6);
}