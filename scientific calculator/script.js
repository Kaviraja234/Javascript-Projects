// Get the display and history elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Initialize degree/radian mode
let isDegree = true;
let degRadButton = document.querySelector('.function');

// Function to toggle between degree and radian mode
function toggleDegRad() {
    isDegree = !isDegree;
    degRadButton.textContent = isDegree ? 'Deg' : 'Rad';
}

// Function to add value to display
function insert(value) {
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
    history.textContent = '';
}

// Function to delete the last character
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Function to calculate factorial
function calculateFactorial() {
    try {
        const num = parseFloat(display.value);
        
        if (num < 0 || !Number.isInteger(num)) {
            display.value = 'Error';
            setTimeout(() => display.value = '', 1500);
            return;
        }
        
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        
        history.textContent = `${num}! =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate sine
function calculateSin() {
    try {
        let value = parseFloat(display.value);
        
        // Convert to radians if in degree mode
        if (isDegree) {
            value = value * Math.PI / 180;
        }
        
        history.textContent = `sin(${display.value}${isDegree ? '°' : ''}) =`;
        display.value = Math.sin(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate cosine
function calculateCos() {
    try {
        let value = parseFloat(display.value);
        
        // Convert to radians if in degree mode
        if (isDegree) {
            value = value * Math.PI / 180;
        }
        
        history.textContent = `cos(${display.value}${isDegree ? '°' : ''}) =`;
        display.value = Math.cos(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate tangent
function calculateTan() {
    try {
        let value = parseFloat(display.value);
        
        // Convert to radians if in degree mode
        if (isDegree) {
            value = value * Math.PI / 180;
        }
        
        history.textContent = `tan(${display.value}${isDegree ? '°' : ''}) =`;
        display.value = Math.tan(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate logarithm (base 10)
function calculateLog() {
    try {
        const value = parseFloat(display.value);
        
        if (value <= 0) {
            display.value = 'Error';
            setTimeout(() => display.value = '', 1500);
            return;
        }
        
        history.textContent = `log(${value}) =`;
        display.value = Math.log10(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate natural logarithm (base e)
function calculateLn() {
    try {
        const value = parseFloat(display.value);
        
        if (value <= 0) {
            display.value = 'Error';
            setTimeout(() => display.value = '', 1500);
            return;
        }
        
        history.textContent = `ln(${value}) =`;
        display.value = Math.log(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate logarithm base 2
function calculateLog2() {
    try {
        const value = parseFloat(display.value);
        
        if (value <= 0) {
            display.value = 'Error';
            setTimeout(() => display.value = '', 1500);
            return;
        }
        
        history.textContent = `log₂(${value}) =`;
        display.value = Math.log2(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate square root
function calculateSqrt() {
    try {
        const value = parseFloat(display.value);
        
        if (value < 0) {
            display.value = 'Error';
            setTimeout(() => display.value = '', 1500);
            return;
        }
        
        history.textContent = `√(${value}) =`;
        display.value = Math.sqrt(value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate percentage
function percentage() {
    try {
        display.value = parseFloat(display.value) / 100;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Function to calculate the result
function calculate() {
    try {
        // Save the expression for history
        const expression = display.value
            .replace(/Math.pow/g, 'pow')
            .replace(/Math.PI/g, 'π')
            .replace(/Math.E/g, 'e');
        
        // Evaluate the expression
        const result = eval(display.value);
        
        // Display the result and update history
        history.textContent = `${expression} =`;
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1500);
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Number keys and basic operators
    if (/[\d+\-*/.()]/.test(key)) {
        insert(key);
    } 
    // Enter key for equals
    else if (key === 'Enter') {
        calculate();
    } 
    // Backspace key for delete
    else if (key === 'Backspace') {
        backspace();
    }
    // Escape key for clear
    else if (key === 'Escape') {
        clearDisplay();
    }
    // 'p' key for pi
    else if (key === 'p') {
        insert('Math.PI');
    }
    // 'e' key for Euler's number
    else if (key === 'e') {
        insert('Math.E');
    }
});