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
let lastOperation = 0 // 0: Enter number, 1: Enter operator

displayOnScreen(0)

for (let number of digits) {
    number.onclick = function() {
        currentNumber += number.value
        console.log(currentNumber)
        displayOnScreen(currentNumber)
        lastOperation = 0
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
        if (lastOperation === 1 && currentOperator === operator.value) { // Avoid multiple operator (+++++)
            return
        } else {
            dotCounter = 0 // For decimal point
            let currentNumberVal = parseFloat(currentNumber)
            if (currentNumberVal !== NaN && currentResult !== 0) {
                calculateResult(currentNumberVal)
                displayOnScreen(currentResult)
            } else if (currentNumberVal !== NaN && currentResult === 0){
                currentResult = parseFloat(currentNumber)
            }
            currentOperator = operator.value
            currentNumber = ""
            lastOperation = 1
        }
    }
}

result.onclick = function() {
    let currentNumberVal = parseFloat(currentNumber)
    
    currentNumber = ""
    calculateResult(currentNumberVal)
    displayOnScreen(currentResult)

}
 
// Do calculation between currentResult and number
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
    } else if (currentOperator === "/") {
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
