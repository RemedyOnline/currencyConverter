document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "5837be7880094549a5950d1d078e539b"; // Replace with your News API key
  const url = `https://newsapi.org/v2/everything?q=finance+investing&language=en&apiKey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const articlesContainer = document.getElementById("finance-articles");

      if (data.articles && data.articles.length > 0) {
        data.articles.forEach((article) => {
          const li = document.createElement("li");
          const articleLink = document.createElement("a");

          articleLink.href = article.url;
          articleLink.target = "_blank";
          articleLink.textContent = article.title;

          li.appendChild(articleLink);
          articlesContainer.appendChild(li);
        });
      } else {
        articlesContainer.innerHTML =
          "<li>No financial articles found at the moment.</li>";
      }
    })
    .catch((error) => console.error("Error fetching financial tips:", error));
});
