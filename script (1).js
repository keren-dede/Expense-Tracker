const balance = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
    date: date.value,
    category: category.value,
    type: type.value
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  init();
  form.reset();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  init();
}

function updateValues() {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  balance.textContent = `₵${(income - expense).toFixed(2)}`;
  incomeEl.textContent = `₵${income.toFixed(2)}`;
  expenseEl.textContent = `₵${expense.toFixed(2)}`;
}

function addToDOM(t) {
  const li = document.createElement('li');
  li.classList.add(t.type);

  li.innerHTML = `
    ${t.text} (${t.category}) - ₵${t.amount}
    <button onclick="removeTransaction(${t.id})">x</button>
  `;

  list.appendChild(li);
}

function init() {
  list.innerHTML = '';
  transactions.forEach(addToDOM);
  updateValues();
}

form.addEventListener('submit', addTransaction);
init();