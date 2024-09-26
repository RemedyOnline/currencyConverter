document.getElementById('convertBtn').addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    if (amount === "") {
        resultElement.innerText = "Please enter an amount.";
        return;
    }

    try {
        // Fetch exchange rates from the API
        const response = await fetch(`https://v6.exchangerate-api.com/v6/e742b87a5027a80d6f425e32/latest/${fromCurrency}`);
        const data = await response.json();
        const exchangeRate = data.conversion_rates[toCurrency];

        // Calculate and display the result
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultElement.innerText = "Error fetching data.";
    }
}
