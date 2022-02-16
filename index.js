const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const operators = $$(".controller__operator-btn")
const digits = $$(".controller__digit-btn")
const reset = $("#reset")
const result = $("#result")
const display = $(".display__value")
const dot = $("#dot")

let currentResult = 0
let currentNumber = ""
let currentOperator = ""
let dotCounter = 0

displayOnScreen(0)

for (let number of digits) {
    number.onclick = function() {
        currentNumber += number.value
        console.log(currentNumber)
        displayOnScreen(currentNumber)
    }
}

dot.onclick = function() {
    if (dotCounter === 0) {
        currentNumber += "."
        console.log(currentNumber)
        displayOnScreen(currentNumber)
        dotCounter = 1
    }
}

for (let operator of operators) {
    operator.onclick = function() {
        dotCounter = 0
        let currentNumberVal = new Number(currentNumber)
        currentOperator = operator.value
        if (currentResult !== 0) { // In calculation (Ex: 3+2+7)
            displayOnScreen(currentResult)
            calculateResult(currentNumberVal)
            displayOnScreen(currentResult)
        } else { // New calculation
            currentResult = new Number(currentNumber)
            currentOperator = operator.value
        }
        currentNumber = ""
    }
}

result.onclick = function() {
    let currentNumberVal = new Number(currentNumber)
    currentNumber = ""
    calculateResult(currentNumberVal)
    displayOnScreen(currentResult)

}

function calculateResult(number) {
    if (currentOperator === "+") {
        currentResult += number

    } else if (currentOperator === "-") {
        currentResult -= number

    } else if (currentOperator === "x") {
        if (currentResult === 0) {
            currentResult = number
        } else {
            currentResult *= number
        }
    } else {
        if (currentResult === 0) {
            currentResult = number
        } else {
            currentResult /= number
        }
    }
}

reset.onclick = function() {
    currentResult = 0
    currentOperator = ""
    displayOnScreen(0)

}

function displayOnScreen(content) {
    display.innerHTML = content
}
