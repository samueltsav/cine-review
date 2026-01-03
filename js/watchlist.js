async function fetchWatchlist() {
    try {
        let response = await fetch(`http://localhost:3000/watchlist`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        displayWatchlist(data);
        console.log(data);
    } catch (error) {
        console.error("Fetch error: " + error.message);
    }
}
fetchWatchlist();

function displayWatchlist(watchlist) {
    const container = document.getElementById("watchlist-content");
    watchlist.forEach(movie => {
        const watchlistCard = document.createElement("div");
        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttonsDiv";
        watchlistCard.className = "watchlistCard";
        watchlistCard.innerHTML = `
        <p><strong>ID:</strong> ${movie.id}</p>
        <p><strong>Movie ID:</strong> ${movie.movieId}</p>
        <p><strong>Added At:</strong> ${movie.addedAt}</p>`;

        buttonsDiv.innerHTML = `
        <button class="details-btn" data-id="${movie.id}">View movie details</button>
        <button class="remove-btn" data-id="${movie.id}">Remove from watchlist</button>`;

        watchlistCard.appendChild(buttonsDiv);
        container.appendChild(watchlistCard);
    });
}