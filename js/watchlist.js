// Helper functions for watchlist states
function loading() {
    const loadingContainer = document.getElementById("watchlist-loading");
    loadingContainer.innerHTML = `
    <div class="spinner" aria-label="Loading"></div>
    `;
    loadingContainer.style.display = "block";
}

function loadWatchlist() {
    const loadWatchlistContainer = document.getElementById("watchlist-loaded");
    loadWatchlistContainer.style.display = "block";
}

function emptyWatchlist() {
    const emptyWatchlistContainer = document.getElementById("watchlist-empty");
    emptyWatchlistContainer.style.display = "block";
}

function clearLoading() {
    const container = document.getElementById("watchlist-loading");
    container.innerHTML = "";
}



// Fetch and display watchlist movies
async function fetchWatchlist() {
    loading();
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
    }finally {
        clearLoading();
    }

}
fetchWatchlist();

function displayWatchlist(watchlist) {
    const watchlistContainer = document.getElementById("watchlist-content");

    watchlistContainer.innerHTML = "";

    // Empty state
    if (!watchlist || watchlist.length === 0) {
        emptyWatchlist();
    } else {
        loadWatchlist();
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
        watchlistContainer.appendChild(watchlistCard);
    });
}

// Remove movie from watchlist
async function removeFromWatchlist(id) {
    try {
        let response = await fetch(`http://localhost:3000/watchlist/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(`Movie with ID ${id} removed from watchlist.`);
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