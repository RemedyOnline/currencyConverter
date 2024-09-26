document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '27IB9LY7N6OY6JH3'; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=EUR&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data && data['Time Series FX (Daily)']) {
              const dates = [];
              const rates = [];
              
              // Process data for the last 30 days
              for (let date in data['Time Series FX (Daily)']) {
                  dates.push(date);
                  rates.push(data['Time Series FX (Daily)'][date]['4. close']);
                  if (dates.length >= 30) break; // Limit to 30 days
              }

              // Reverse arrays to show older dates first
              dates.reverse();
              rates.reverse();

              // Create a chart using Chart.js
              const ctx = document.getElementById('currencyChart').getContext('2d');
              new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: dates,
                      datasets: [{
                          label: 'USD to EUR Exchange Rate',
                          data: rates,
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          borderWidth: 1
                      }]
                  },
                  options: {
                      scales: {
                          x: {
                              title: {
                                  display: true,
                                  text: 'Date'
                              }
                          },
                          y: {
                              title: {
                                  display: true,
                                  text: 'Exchange Rate'
                              }
                          }
                      }
                  }
              });
          } else {
              console.error('No data found for the specified currency pair.');
          }
      })
      .catch(error => console.error('Error fetching currency trends:', error));
});
