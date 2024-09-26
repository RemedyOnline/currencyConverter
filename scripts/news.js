document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'HnXMBU7OQgsBVUbyPioNJmyiAkTknjJ6vXeUzKSk'; // Replace with your MarketAux API key
    const url = `https://api.marketaux.com/v1/news/all?language=en&api_token=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data && data.data) {
              const newsContainer = document.getElementById('news-container');
              data.data.forEach(article => {
                  const articleDiv = document.createElement('div');
                  articleDiv.className = 'news-article';
                  
                  articleDiv.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                  `;
                  newsContainer.appendChild(articleDiv);
              });
          } else {
              document.getElementById('news-container').innerHTML = `<p>No news articles found.</p>`;
          }
      })
      .catch(error => console.error('Error fetching news:', error));
});
