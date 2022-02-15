const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const operators = $$(".controller__operator-btn")
const digits = $$(".controller__digit-btn")
const decimal = $(".decimal")
const reset = $("#reset")
const result = $("#result")

let currentResult = 0
let currentNumber = ""
let firstNumber = 0
let currentOperator = ""
let dotCounter = 0

for (let number of digits) {
    number.onclick = function() {
        if (number.value === "." && dotCounter === 1) {
            return
        } else {
            dotCounter++
        }
        currentNumber += number.value
    }
}

for (let operator of operators) {
    operator.onclick = function() {
        let currentNumberVal = new Number(currentNumber)
        if (operator.value === "+") {
            currentResult += currentNumberVal

        } else if (operator.value === "-") {
            currentResult -= currentNumberVal

        } else if (operator.value === "x") {
            currentResult *= currentNumberVal
        } else {
            if (currentResult === 0) {
                currentResult = currentNumberVal
            } else {
                currentResult /= currentNumberVal
            }
        }
        currentNumber = ""
        currentOperator = operator.value
    }
}

result.onclick = function() {
    console.log(currentResult)
}

