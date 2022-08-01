const equationEl = document.querySelector(".equation");
const resultEl = document.querySelector(".result");
const calculateEl = document.querySelector(".calculate");
const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

let operand1 = "";
let operand2 = "";
let operation = "";
let result;

numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    if (operand2.includes(".") && e.target.textContent === ".") return;
    operand2 += e.target.textContent;
    equationEl.textContent = operand1 + operation + operand2;
  });
});

const operationHandler = function (operator) {
  if (operation) {
    operation = operator;
    let newEquationEl = equationEl.textContent.substring(
      0,
      equationEl.textContent.length - 1
    );
    newEquationEl += operation;
    equationEl.textContent = newEquationEl;
  } else if (result) {
    operation = operator;
    equationEl.textContent = result + operation;
    operand1 = result;
    operand2 = "";
  } else {
    operation = operator;
    equationEl.textContent += operation;
    operand1 = operand2;
    operand2 = "";
  }
};

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    operationHandler(e.target.textContent);
  });
});

calculateEl.addEventListener("click", (e) => {
  let num1 = Number(operand1);
  let num2 = Number(operand2);

  if (num1 && num2) {
    if (operation === "+") {
      result = num1 + num2;
    } else if (operation === "-") {
      result = num1 - num2;
    } else if (operation === "*") {
      result = num1 * num2;
    } else if (operation === "/") {
      result = num1 / num2;
    } else if (operation === "%") {
      result = num1 % num2;
    }

    resultEl.textContent = result;
    operand1 = "";
    operand2 = "";
    operation = "";
  }
});
