'use strict';

const balance = document.getElementById('balance');

const moneyPlus = document.getElementById('money-plus');

const moneyMinus = document.getElementById('money-minus');

const list = document.getElementById('list');

const form = document.getElementById('form');

const transaction = document.getElementById('transaction');

const amount = document.getElementById('amount');

// let transactions = [
//   { id: 1, transaction: 'Books', amount: -100 },
//   { id: 2, transaction: 'Coins', amount: 200 },
//   { id: 3, transaction: 'Breakfast', amount: -300 },
//   { id: 4, transaction: 'Mobile', amount: 400 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//updateValues

const updateValues = function () {
  const amounts = transactions.map((transaction) => transaction.amount);
  const plusTransactions = amounts.filter((amount) => amount > 0);

  const minusTransactions = amounts.filter((amount) => amount < 0);

  const incomeValue = plusTransactions.reduce((acc, amount) => acc + amount, 0);

  const expenseValue = minusTransactions.reduce(
    (acc, amount) => acc + amount,
    0
  );

  moneyPlus.innerHTML = incomeValue;
  moneyMinus.innerHTML = expenseValue;
  balance.innerHTML = incomeValue + expenseValue;
};

//Add transactions to DOM List
function addTransactionDOM(transaction) {
  //get Sign
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.transaction} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class = "delete-btn" onclick = "removeTransactions(${
    transaction.id
  })"  >x</button>
  `;
  list.appendChild(item);
}

//Remove Transaction by ID

function removeTransactions(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateValues();

  updateLocalStorage();

  init();
}

// update localStorageTransactions

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

//INit app()
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (transaction.value.trim() === ' ' || amount.value === '') {
    alert('Please add Transaction Details');
  }
  const transactionDetails = {
    id: generateRandomID(),
    transaction: transaction.value,
    amount: +amount.value,
  };
  transactions.push(transactionDetails);

  addTransactionDOM(transactionDetails);
  updateValues();

  updateLocalStorage();
  transaction.value = '';
  amount.value = '';
});

const generateRandomID = function () {
  return Math.floor(Math.random() * 10000);
};