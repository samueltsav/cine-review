// Fetch and display watchlist movies
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
    const watchlisContainer = document.getElementById("watchlist-content");
    const watchlistHeader = document.getElementById("watchlist-header");

    watchlisContainer.innerHTML = "";

    // Empty state
    if (!watchlist || watchlist.length === 0) {
        watchlistHeader.style.display = "none";
        watchlisContainer.innerHTML = `
            <div class="empty-state">
                <h2>Your watchlist is empty!</h2>
                <p>Start adding movies you want to watch.</p>
                 <button class="browse-movies--btn" onclick="window.location.href='movies.html'">Browse Movies</button>
            </div> 
        `;
        return;
    }

    watchlist.forEach(movie => {
        const watchlistCard = document.createElement("div");
        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttonsDiv";
        watchlistCard.className = "watchlistCard";
        watchlistCard.innerHTML = `
            <p><strong>ID:</strong> ${movie.id}</p>
            <p><strong>Title:</strong> ${movie.title}</p>
            <p><strong>Added At:</strong> ${movie.addedAt}</p>
            `;

        buttonsDiv.innerHTML = `
            <button class="details-btn" data-id="${movie.id}">View details</button>
            <button class="remove-btn" data-id="${movie.id}">Remove</button>
            `;

        watchlistCard.appendChild(buttonsDiv);
        watchlisContainer.appendChild(watchlistCard);
    });
}

// Remove movie from watchlist
async function removeFromWatchlist(movieId) {
    try {
        let response = await fetch(`http://localhost:3000/watchlist/${movieId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Movie with ID ${movieId} removed from watchlist.`);
        location.reload();
    } catch (error) {
        console.error("Delete error: " + error.message);
    }
}

// Event delegation for dynamically created buttons
document.getElementById("watchlist-content").addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        const movieId = event.target.getAttribute("data-id");
        removeFromWatchlist(movieId);
    } else if (event.target.classList.contains("details-btn")) {
        const movieId = event.target.getAttribute("data-id");
        window.location.href = `movies.html?id=${movieId}`;
    }
});