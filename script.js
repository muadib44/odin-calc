let num1 = '';
let num2 = '';
let operator = '';
const display = document.querySelector('#display');
const numberButtons = document.querySelectorAll('.num-pad button');
const operatorButtons = document.querySelectorAll('.operator-pad button');
const equalButtons = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const decimalButton = document.querySelector('#decimal');

clearButton.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operator = '';
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    if (operator === '') {
        num1 = num1.slice(0, -1);
    } else if (num2 === '') {
        operator = '';
    } else {
        num2 = num2.slice(0, -1);
    }
    updateDisplay();
});

numberButtons.forEach(button => { button.addEventListener (
    'click', () => {
        const digit = button.textContent;

        if (digit === 'C' || digit === '=') return;

        if (digit === ".") {
            if (operator === '' && num1.includes('.')) { 
                return;
            }
            if (operator !== '' && num2.includes('.')) {
                return;
            }
        }
   
        if (operator === '') {
            num1 += digit;
        } else {
            num2 += digit;
        }
        updateDisplay()
    }
)})

operatorButtons.forEach(button => { button.addEventListener (
    'click', () => {
     if (num1 === '') return;

     if (operator !== '' && num2 !== '') {
        const result = operate(operator, Number(num1), Number(num2));
        display.innerHTML = result;
        num1 = String(result);
        num2 = '';
     }

     operator = button.textContent;
     updateDisplay();
    }
)})

equalButtons.addEventListener('click', () => {
    if (num1 === '' || num2 === '' || operator === '') {
         return display.innerHTML = 'Error: Incomplete expression';
    }

    const result = operate(operator, parseFloat(num1), parseFloat(num2));
    display.innerHTML = result;
    num1 = String(parseFloat(result.toFixed(2)));
    num2 = '';
    operator = '';
    updateDisplay();
})

window.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        document.querySelector(`.num-pad button[data-key="${key}"]`).click();
    } else if (['+', '-', '*', '/'].includes(key)) {
        document.querySelector(`.operator-pad button[data-key="${key}"]`).click();
    } else if (key === 'Enter') {
        equalButtons.click();
    } else if (key === 'Backspace') {
        deleteButton.click();
    } else if (key === 'Escape') {
        clearButton.click();
    } else if (key === '.') {
        decimalButton.click();
    }
});

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    if (num2 === 0) {
        return 'Error: Division by zero';
    }
    return num1 / num2;
}

function operate (operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'Error: Invalid operator';
    }
}

function updateDisplay() {
    if (operator ==='' || operator === null) {
        display.innerHTML = num1;
    } else {
    display.innerHTML = `${num1} ${operator} ${num2}`;
    }
}