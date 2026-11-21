const firstNumberInput = document.getElementById('first-number');
const secondNumberInput = document.getElementById('second-number');
const resultOutput = document.getElementById('result');
const messageOutput = document.getElementById('message');
const operationButtons = document.querySelectorAll('[data-operation]');

function parseNumber(input) {
    const value = input.value.trim().replace(',', '.');

    if (value === '' || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)) {
        return null;
    }

    const number = Number(value);
    return Number.isFinite(number) ? number : null;
}

function calculate(operation) {
    const firstNumber = parseNumber(firstNumberInput);
    const secondNumber = parseNumber(secondNumberInput);

    if (firstNumber === null || secondNumber === null) {
        resultOutput.textContent = '—';
        messageOutput.textContent = 'Введіть два коректні числа.';
        return;
    }

    if (operation === 'divide' && secondNumber === 0) {
        resultOutput.textContent = '—';
        messageOutput.textContent = 'На нуль ділити не можна.';
        return;
    }

    let result;

    switch (operation) {
        case 'add':
            result = firstNumber + secondNumber;
            break;
        case 'subtract':
            result = firstNumber - secondNumber;
            break;
        case 'multiply':
            result = firstNumber * secondNumber;
            break;
        case 'divide':
            result = firstNumber / secondNumber;
            if (!Number.isInteger(result)) {
                result = Math.round((result + Number.EPSILON) * 100) / 100;
            }
            break;
        default:
            return;
    }

    if (!Number.isFinite(result)) {
        resultOutput.textContent = '—';
        messageOutput.textContent = 'Результат виходить за межі допустимого.';
        return;
    }

    resultOutput.textContent = String(result);
    messageOutput.textContent = '';
}

operationButtons.forEach((button) => {
    button.addEventListener('click', () => calculate(button.dataset.operation));
});
