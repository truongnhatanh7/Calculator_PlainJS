const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const operators = $$(".controller__operator-btn")
const digits = $$(".controller__digit-btn")
const reset = $("#reset")
const result = $("#result")
const display = $(".display__value")

let currentResult = 0
let currentNumber = ""
let currentOperator = ""
let dotCounter = 0

displayOnScreen(0)

for (let number of digits) {
    number.onclick = function() {
        if (number.value === "." && dotCounter === 1) {
            return
        } else {
            dotCounter++
        }
        currentNumber += number.value
        displayOnScreen(currentNumber)
    }
}

for (let operator of operators) {
    operator.onclick = function() {
        currentResult += new Number(currentNumber)
        currentNumber = ""
        currentOperator = operator.value
    }
}

result.onclick = function() {
    let currentNumberVal = new Number(currentNumber)
    currentNumber = ""
    if (currentOperator === "+") {
        currentResult += currentNumberVal

    } else if (currentOperator === "-") {
        currentResult -= currentNumberVal

    } else if (currentOperator === "x") {
        if (currentResult === 0) {
            currentResult = currentNumberVal
        } else {
            currentResult *= currentNumberVal
        }
    } else {
        if (currentResult === 0) {
            currentResult = currentNumberVal
        } else {
            currentResult /= currentNumberVal
        }
    }
    displayOnScreen(currentResult)

}

reset.onclick = function() {
    currentResult = 0
    displayOnScreen(0)

}

function displayOnScreen(content) {
    display.innerHTML = content
}

