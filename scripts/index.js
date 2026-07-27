const keypad = document.querySelector(".buttons");
const previousOperation = document.querySelector(".previous-operation");
const currentOperation = document.querySelector(".current-operation");
const operators = {add: "+", subtract: "-", multiply: "*", divide: "/"};

let previousValue = "";
let currentValue = "";
let operator = "";

const updateDisplay = () => {
    previousOperation.textContent = previousValue ? previousValue + operator : "";
    currentOperation.textContent = currentValue;
}

const calculate = () => {
    const previous = Number(previousValue);
    const current = Number(currentValue);

    switch (operator) {
        case "+":
            return String(previous + current);
        case "-":
            return String(previous - current);
        case "*":
            return String(previous * current);
        case "/":
            if (current === 0) {
                return "Error";
            }
            
            return String(previous / current);
    }
}

const handleValue = value => {
    if (value === "." && currentValue.includes(".")) {
        return;
    }

    currentValue += value;
    updateDisplay();
}

const handleAction = action => {
    switch (action) {
        case "add":
        case "subtract":
        case "multiply":
        case "divide":
            if (previousValue === "") {
                previousValue = currentValue;
            }

            else {
                previousValue = calculate();
            }  

            currentValue = "";
            operator = operators[action];

            break;

        case "delete":
            if (currentValue) {
                currentValue = currentValue.slice(0, -1);
            }

            break;

        case "all-clear":
            previousValue = "";
            currentValue = "";
            operator = "";

            break;

        case "toggle-sign":
            if (currentValue) {
                currentValue = String(Number(currentValue) * -1);
            }

            break;

        case "percent":
            if (currentValue) {
                currentValue = String(Number(currentValue) / 100);
            }

            break;

        case "equals":
            currentValue = calculate();
            previousValue = "";
            operator = "";
            break;
    }

    updateDisplay();
}

keypad.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.value) {
        handleValue(button.dataset.value);
    }

    else {
        handleAction(button.dataset.action);
    }
});