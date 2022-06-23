let calcTime = document.querySelector(".calc__time");
let time = new Date().toLocaleTimeString().slice(0, -3);
calcTime.insertAdjacentHTML("afterbegin", time);


let firstNumber = '';
let secondNumber = '';
let operator = '';
let end = false;

let result = document.querySelector(".result");


const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operators = ["÷", "x", "+", "-"];
const negative = document.querySelector(".digit-negative").textContent;
const percent = document.querySelector(".digit-percent").textContent;

let clearBtn = document.querySelector(".digit-clear");

let clearAll = () => {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  result.textContent = '0';
}

let allButtons = document.querySelectorAll(".digit");

for (const button of allButtons) {
  button.addEventListener("click", function (event) {
    const key = event.target.textContent;
    if (firstNumber != '' && key === "%") {
      firstNumber /= 100;
      result.textContent = firstNumber;
    }
    else {
      result.textContent = '';
    }
    if (button == clearBtn && clearBtn.textContent === "C") {
      clearBtn.textContent = "AC"
      clearAll()
    }
    if (digits.includes(key)) {
      clearBtn.textContent = "C"
      if (secondNumber === '' && operator === '') {
        firstNumber += key;
        result.textContent = firstNumber;
      }
      else if (firstNumber != '' && secondNumber != '' && end && key != "%") {
        secondNumber = key;
        end = false;
        result.textContent = secondNumber;
      }
      else {
        secondNumber += key;
        result.textContent = secondNumber;

      }
    }
    if (operators.includes(key)) {
      operator = key;
      return;
    }
    if (key === "=") {
      switch (operator) {
        case "+":
          firstNumber = Number(firstNumber) + Number(secondNumber);
          break;
        case "-":
          firstNumber = Number(firstNumber) - Number(secondNumber);
          break;
        case "x":
          firstNumber = Number(firstNumber) * Number(secondNumber);
          break;
        case "÷":
          if (secondNumber === "0") {
            clearAll()
            result.textContent = "Error"
            return
          }
          firstNumber = Number(firstNumber) / Number(secondNumber);
          break;
      }
      end = true;
      result.textContent = firstNumber;
    }
  })
}






