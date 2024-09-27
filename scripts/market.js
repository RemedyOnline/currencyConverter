document.getElementById('fetch-stock').addEventListener('click', function() {
    const symbol = document.getElementById('stock-symbol').value.toUpperCase();
    const apiKey = 'crq70qpr01qutsn3ks80crq70qpr01qutsn3ks8g';  // Replace with your actual API key
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data && data.c) {
              document.getElementById('stock-info').innerHTML = `
                <h3>Stock Symbol: ${symbol}</h3>
                <p>Current Price: $${data.c}</p>
                <p>Open Price: $${data.o}</p>
                <p>High Price: $<span class="high-price">${data.h}</span></p>
                <p>Low Price: $<span class="low-price">${data.l}</span></p>
                <p>Previous Close: $${data.pc}</p>
              `;
          } else {
              document.getElementById('stock-info').innerHTML = `<p>Invalid stock symbol. Please try again.</p>`;
          }
      })
      .catch(error => console.error('Error fetching stock data:', error));
});
