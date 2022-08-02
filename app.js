const equationEl = document.querySelector(".equation");
const resultEl = document.querySelector(".result");
const calculateEl = document.querySelector(".calculate");
const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

let operand1 = "";
let operand2 = "";
let operation = "";
let result = 0;

// Assigning Values to operands
const assignValue = function (e) {
  const val = e.target.textContent;
  if (operand2.includes(".") && val === ".") return;
  operand2 += val;
  equationEl.textContent = operand1 + operation + operand2;
};

numbers.forEach((num) => {
  num.addEventListener("click", assignValue);
});

// Function to remove Last Character
const removeLastChar = (content) => {
  return content.substring(0, content.length - 1);
};

// =============================================

// Assigning operator
const assignOperator = function (e) {
  calculate();
  const operator = e.target.textContent;
  if (operation) {
    operation = operator;
    equationEl.textContent = removeLastChar(equationEl.textContent) + operation;
  } else if (result) {
    operand1 = result;
    operation = operator;
    equationEl.textContent = result + operation;
    operand2 = "";
  } else {
    operation = operator;
    equationEl.textContent += operation;
    operand1 = operand2;
    operand2 = "";
  }
};

operators.forEach((operator) => {
  operator.addEventListener("click", assignOperator);
});

// =============================================

const calculate = function () {
  let num1 = Number(operand1);
  let num2 = Number(operand2);
  if (num1 && num2) {
    if (operation === "+") result = num1 + num2;
    else if (operation === "-") result = num1 - num2;
    else if (operation === "*") result = num1 * num2;
    else if (operation === "/") result = num1 / num2;
    else if (operation === "%") result = num1 % num2;

    resultEl.textContent = result;
    operand1 = "";
    operand2 = "";
    operation = "";
  }
};

calculateEl.addEventListener("click", calculate);
