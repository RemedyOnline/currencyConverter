// Select elements
const addTransactionBtn = document.getElementById('addTransaction');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpensesEl = document.getElementById('totalExpenses');
const remainingBalanceEl = document.getElementById('remainingBalance');
const transactionListEl = document.getElementById('transactionList');

// Initialize transactions array from local storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Update DOM
function updateDOM() {
  transactionListEl.innerHTML = '';

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction, index) => {
    const transactionEl = document.createElement('li');
    transactionEl.innerText = `${transaction.description}: $${transaction.amount}`;
    transactionEl.classList.add(transaction.category === 'income' ? 'income' : 'expense');

    transactionEl.addEventListener('dblclick', () => {
      transactions.splice(index, 1);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      updateDOM();
    });

    transactionListEl.appendChild(transactionEl);

    if (transaction.category === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });

  totalIncomeEl.innerText = `$${totalIncome}`;
  totalExpensesEl.innerText = `$${totalExpenses}`;
  remainingBalanceEl.innerText = `$${totalIncome - totalExpenses}`;
}

// Add new transaction
function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (description && !isNaN(amount)) {
    const transaction = { description, amount, category };
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateDOM();
  }
}

// Event listener for adding transaction
addTransactionBtn.addEventListener('click', addTransaction);

// Initial render
updateDOM();


// Fetch live exchange rates using the ExchangeRate-API or Currency Layer API
const apiKey = 'e742b87a5027a80d6f425e32';
const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`; // Example for USD base

async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Display some common exchange rates
        document.getElementById('exchange-rates').innerHTML = `
            <p>USD to EUR: ${data.rates.EUR}</p>
            <p>USD to GBP: ${data.rates.GBP}</p>
            <p>USD to JPY: ${data.rates.JPY}</p>
        `;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        document.getElementById('exchange-rates').innerHTML = `<p>Failed to fetch rates.</p>`;
    }
}

fetchExchangeRates();
