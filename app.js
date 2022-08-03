const equationEl = document.querySelector(".equation");
const resultEl = document.querySelector(".result");
const calculateEl = document.querySelector(".calculate");
const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const deletion = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const historyBtn = document.querySelector(".history-btn");
const historyBox = document.querySelector(".history-box");
const historyContent = document.querySelector(".history-content");

let operand1 = "";
let operand2 = "";
let operation = "";
let result = 0;

// Function to print history
const printHistory = function () {
  const history = document.createElement("p");
  history.setAttribute("class", "history");
  history.textContent = `${operand1} ${operation} ${operand2} = ${result}`;
  historyContent.appendChild(history);
};

// =============================================

// Assigning Values to operands
const assignValue = function (val) {
  if (operand2.includes(".") && val === ".") return;
  if (operand2.length < 10) operand2 += val;
  equationEl.textContent = operand1 + operation + operand2;
};

numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    assignValue(e.target.textContent);
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) assignValue(e.key);
  if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "*" ||
    e.key === "%"
  )
    assignOperator(e.key);

  if (e.key === "Backspace") backspace();
  if (e.key === "Enter") calculate();
});

// =============================================

// Assigning operator
const assignOperator = function (operator) {
  calculate();
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
  operator.addEventListener("click", (e) => {
    assignOperator(e.target.textContent);
  });
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
    else if (operation === "%") result = (num1 * num2) / 100;
    const resultStr = String(result);
    if (resultStr.length < 10) resultEl.textContent = result;
    else resultEl.textContent = resultStr.slice(0, 10) + "...";
    printHistory();
    operand1 = "";
    operand2 = "";
    operation = "";
  }
};

calculateEl.addEventListener("click", calculate);

// =============================================

// Backspace Functionality

// Function to remove Last Character
const removeLastChar = (content) => {
  return content.substring(0, content.length - 1);
};

const backspace = function () {
  equationEl.textContent = removeLastChar(equationEl.textContent);
  if (operand2) {
    operand2 = removeLastChar(operand2);
  } else {
    operation = "";
    operand2 = operand1;
    operand1 = "";
  }
};

deletion.addEventListener("click", backspace);

// =============================================

// Resetting Functionality
clear.addEventListener("click", () => {
  operand1 = "";
  operand2 = "";
  operation = "";
  result = 0;
  equationEl.textContent = "";
  historyContent.textContent = "";
  resultEl.textContent = 0;
});

// =============================================

historyBtn.addEventListener("click", () => {
  historyBox.classList.toggle("active");
});
