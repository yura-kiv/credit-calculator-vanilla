const loanAmountInputMin = 1000;
const loanAmountInputMax = 60000;
let loanAmountInputError = false;

const loanPeriodInputMin = 7;
const loanPeriodInputMax = 60;
let loanPeriodInputError = false;

const interestRate = 2.2;

const loanAmountInput = document.getElementById("loan-amount");
const loanAmountRange = document.getElementById("loan-amount-range");
const loanAmountErrorMsg = document.getElementById("loan-amount-error-msg");
const loanPeriodInput = document.getElementById("loan-period");
const loanPeriodRange = document.getElementById("loan-period-range");
const loanPeriodErrorMsg = document.getElementById("loan-period-error-msg");
const dailyRepaymentOutput = document.getElementById("daily-repayment-output");
const totalRepaymentOutput = document.getElementById("total-repayment-output");
const calculateButton = document.getElementById("calculate-button");
const loanCalculatorform = document.getElementById("credit-form");

// Calculate final payments
function calculateRepayment() {
  const loanAmount = parseFloat(loanAmountInput.value);
  const loanPeriod = parseInt(loanPeriodInput.value);

  if (loanAmountInputError || loanPeriodInputError) {
    calculateButton.disabled = true;
    dailyRepaymentOutput.textContent = "0.00";
    totalRepaymentOutput.textContent = "0.00";
    return;
  }

  calculateButton.disabled = false;
  const dailyRepayment = (loanAmount + loanAmount * (interestRate / 100) * loanPeriod) / loanPeriod;
  const totalRepayment = dailyRepayment * loanPeriod;

  dailyRepaymentOutput.textContent = dailyRepayment.toFixed(2) + " UAH";
  totalRepaymentOutput.textContent = totalRepayment.toFixed(2) + " UAH";
}

// Handlers and validations

function getInputErrorMessage(msg) {
  const error = document.createElement("span");
  error.setAttribute("id", "input-error-msg");
  error.textContent = msg;
  return error;
}

// Amount
function loanAmountInputCheck(loanAmount) {
  if (isNaN(loanAmount) || loanAmount < 1000 || loanAmount > 50000) {
    const msg = getInputErrorMessage(
      "The amount of the loan should be from UAH 1,000 to UAH 50,000."
    );
    loanAmountRange.value = loanAmountInputMin;
    loanAmountInput.classList.add("error");
    loanAmountErrorMsg.innerHTML = "";
    loanAmountErrorMsg.appendChild(msg);
    loanAmountInputError = true;
  } else {
    loanAmountErrorMsg.innerHTML = "";
    loanAmountInput.classList.remove("error");
    loanAmountInputError = false;
    loanAmountRange.value = loanAmount;
  }
}

loanAmountRange.addEventListener("input", () => {
  const value = loanAmountRange.value;
  loanAmountInput.value = value;
  loanAmountInputCheck(value);
  calculateRepayment();
});

loanAmountInput.addEventListener("input", () => {
  const loanAmount = parseFloat(loanAmountInput.value);
  loanAmountInputCheck(loanAmount);
  calculateRepayment();
});

// Period
function loanPeriodInputCheck(loanPeriod) {
  if (isNaN(loanPeriod) || loanPeriod < 7 || loanPeriod > 60) {
    const msg = getInputErrorMessage("The repayment period should be from 7 to 60 days.");
    loanPeriodRange.value = loanPeriodInputMin;
    loanPeriodInput.classList.add("error");
    loanPeriodErrorMsg.innerHTML = "";
    loanPeriodErrorMsg.appendChild(msg);
    loanPeriodInputError = true;
  } else {
    loanPeriodErrorMsg.innerHTML = "";
    loanPeriodInput.classList.remove("error");
    loanPeriodInputError = false;
    loanPeriodRange.value = loanPeriod;
  }
}

loanPeriodRange.addEventListener("input", () => {
  const value = loanPeriodRange.value;
  loanPeriodInput.value = value;
  loanPeriodInputCheck(value);
  calculateRepayment();
});

loanPeriodInput.addEventListener("input", () => {
  const loanPeriod = parseInt(loanPeriodInput.value);
  loanPeriodInputCheck(loanPeriod);
  calculateRepayment();
});

// Default calculation
calculateRepayment();

// Submit form

const msgsContainer = document.getElementById("submit-msg-container");
function getSubmitMsg() {
  const container = document.createElement("div");
  container.id = "success-msg";
  const msg = document.createElement("span");
  msg.innerText = "You have successfully received a loan ✅";
  const close = document.createElement("span");
  close.id = "msg-close";
  close.innerText = "✖";
  close.addEventListener("click", (event) => {
    const msgEl = event.target.parentElement;
    msgsContainer.removeChild(msgEl);
  });
  container.append(msg, close);
  return container;
}

function simulateLoadingAndSubmit(loadingTime) {
  calculateButton.disabled = true;
  calculateButton.innerText = "Loading...";
  setTimeout(function () {
    const msg = getSubmitMsg();
    msgsContainer.appendChild(msg);
    calculateButton.disabled = false;
    calculateButton.innerText = "Get a loan ";
  }, loadingTime);
}

loanCalculatorform.addEventListener("submit", (event) => {
  event.preventDefault();
  simulateLoadingAndSubmit(1000);
});
