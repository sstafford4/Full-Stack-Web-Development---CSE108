let currentOperator = null;
let lastOperator = null;
let firstValue = '';
let secondValue = '';
let isOperatorClicked = false;
let isEqualClicked = false;
let lastSecondValue = null; // Track the second value for repeated operations

// Display numbers in the result field
function display(val) {
    const currentDisplay = document.getElementById('result').value;
    //prevents double decimals
    if (val === '.' && currentDisplay.includes('.')){
        return;
    }
    if (isOperatorClicked || isEqualClicked) {
        document.getElementById('result').value = val;
        isOperatorClicked = false;
        isEqualClicked = false;
    } else {
        document.getElementById('result').value += val;
    }
    secondValue = document.getElementById('result').value;
    clearHighlight(); // Remove operator highlight when a new number is clicked
}

// Clear screen function
function clearScreen() {
    document.getElementById('result').value = '';
    firstValue = '';
    secondValue = '';
    currentOperator = null;
    lastOperator = null;
    lastSecondValue = null;
    isOperatorClicked = false;
    isEqualClicked = false;
    clearHighlight(); // Remove operator highlight
}

// Set operator and highlight it
function setOperator(operator) {
    if (firstValue !== '' && secondValue !== '' && !isOperatorClicked) {
        solve(); // If operator is clicked after both numbers, calculate the result first
    }

    firstValue = document.getElementById('result').value;
    currentOperator = operator;
    isOperatorClicked = true;
    highlightOperator(operator); // Highlight the operator button
    isEqualClicked = false;
}

// Perform calculation
function solve() {
    if (!currentOperator && !lastOperator) return;

    let result;
    
    if (!currentOperator) {
        // If the equals button is pressed again, repeat the last operation
        currentOperator = lastOperator;
        firstValue = document.getElementById('result').value;
        secondValue = lastSecondValue;
    }
    
    result = calculate(firstValue, secondValue, currentOperator);
    document.getElementById('result').value = result;
    
    // Update values for chaining operations
    firstValue = result;
    lastSecondValue = secondValue;
    secondValue = '';
    
    lastOperator = currentOperator; // Store the last operator for repeated operations
    currentOperator = null;
    isEqualClicked = true;
    clearHighlight(); // Remove operator highlight after calculation
}

// Calculation logic
function calculate(first, second, operator) {
    first = parseFloat(first);
    second = parseFloat(second);
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return first;
    }
}

// Highlight the active operator
function highlightOperator(operator) {
    clearHighlight();
    let operatorButtons = document.querySelectorAll('.operators');
    operatorButtons.forEach(button => {
        if (button.value === operator) {
            button.classList.add('highlight');
        }
    });
}

// Clear any highlighted operator
function clearHighlight() {
    let operatorButtons = document.querySelectorAll('.operators');
    operatorButtons.forEach(button => {
        button.classList.remove('highlight');
    });
}