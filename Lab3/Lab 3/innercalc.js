let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let prev_op = null;
let decimalUsed = false;
let lastOperation = null;

function appendToDisplay(value) {
    // Reset display if starting new input
    if (operator && !currentInput) {
        display.value = '';
    }
    
    if (value === '.' && decimalUsed) {
        return; // Prevent multiple decimals
    }
    
    if (value === '.') {
        decimalUsed = true;
    }

    currentInput += value;
    display.value += value;
}

let currentOperatorButton = null;  // Store the currently active operator button

function setOperator(op) {
    if (operator && currentInput) {
        calculate(); // Auto-calculate if there's already an operator and a new one is chosen
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    decimalUsed = false;

    // Highlight the operator button
    highlightOperatorButton(op);
}

function highlightOperatorButton(op) {
    // Remove highlight from the previous operator button
    if (currentOperatorButton) {
        currentOperatorButton.classList.remove('active');
    }

    // Find the button for the current operator and highlight it
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        if (button.textContent === op) {
            button.classList.add('active');
            currentOperatorButton = button;
        }
    });
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput || previousInput);

    if (!operator && prev_op){
        operator = prev_op.operator;
        previousInput = prev_op.result;
        result = op_calc(prev_op.result, prev_op.value, operator);
    }
    else{
        result = op_calc(prev, current, operator);
        lastOperation = {operator,value: current, result};
    }

    display.value = result;
    previousInput = result;
    currentInput = '';
    operator = null;

    // Clear the highlight when equals is pressed
    if (currentOperatorButton) {
        currentOperatorButton.classList.remove('active');
        currentOperatorButton = null;
    }
}

function op_calc(prev, current, operator){
    if (operator == '+'){
        result = prev + current;
    }
    else if (operator == '-'){
        result = prev - current;
    }
    else if (operator == '*'){
        result = prev * current;
    }
    else if (operator == '/'){
        result = prev / current;
    }
    else{
        return;
    }
}


function appendDecimal() {
    if (!decimalUsed) {
        appendToDisplay('.');
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    previousInput = '';
    operator = null;
    decimalUsed = false;

    // Remove operator highlight
    if (currentOperatorButton) {
        currentOperatorButton.classList.remove('active');
        currentOperatorButton = null;
    }
}