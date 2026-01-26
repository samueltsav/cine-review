const API_URL = "http://localhost:3000/movies";
const WATCHLIST_URL = "http://localhost:3000/watchlist";

const moviesGrid = document.getElementById("movies-grid");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genreFilter");
const ratingFilter = document.getElementById("ratingFilter");
const clearBtn = document.getElementById("clear-filters");

let allMovies = []; // to store all fetched movies
let watchlistSet = new Set(); // to store watchlist movie IDs

async function getMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    allMovies = await response.json();
    renderMovies(allMovies);
  } catch (error) {
    console.error("Error fetching data:", error);
    allMovies = [];
    renderMovies([]); // Render empty state on error
  }
}

function applyFilters() {
  let filteredMovies = [...allMovies];
  const selectedGenre = genreFilter.value;
  const minRating = ratingFilter.value;
  const sortBy = sortByFilter.value

  // 🎭 Genre filter
  if (selectedGenre !== "all" && selectedGenre !== "All Genres") {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genre.toLowerCase() === selectedGenre.toLowerCase()
    );
  }

  // ⭐ Rating filter
  if (minRating !== "all" && minRating !== "All Ratings") {
    const ratingValue = Number(minRating);
    filteredMovies = filteredMovies.filter(movie =>
      Math.floor(Number(movie.rating)) === ratingValue
    );
  }

  // sort  
  switch (sortBy) {
    case "rating-high":
      filteredMovies.sort((a, b) => b.rating - a.rating);
      break;

    case "rating-low":
      filteredMovies.sort((a, b) => a.rating - b.rating);
      break;

    case "year":
      filteredMovies.sort((a, b) => b.year - a.year); // newest first
      break;

    case "title":
      filteredMovies.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    default:
      // no sorting
      break;
  }


  renderMovies(filteredMovies);
}

genreFilter.addEventListener("change", applyFilters);
ratingFilter.addEventListener("change", applyFilters);
sortByFilter.addEventListener("change", applyFilters);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  genreFilter.value = "all";
  ratingFilter.value = "All Ratings";
  sortByFilter.value = "default";

  renderMovies(allMovies);
});


async function loadWatchlist() {
  const res = await fetch(WATCHLIST_URL);
  const items = await res.json();
  watchlistSet = new Set(items.map((item) => Number(item.movieId)));
}

function isInWatchlist(movieId) {
  return watchlistSet.has(Number(movieId));
}

async function addToWatchlist(movieId) {
  await fetch(WATCHLIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieId,
      addedAt: new Date().toISOString(),
    }),
  });
}

async function removeFromWatchlist(movieId) {
  const response = await fetch(`${WATCHLIST_URL}?movieId=${movieId}`);
  const items = await response.json();
  if (items.length === 0) return;

  const item = items[0];
  await fetch(`${WATCHLIST_URL}/${item.id}`, {
    method: "DELETE",
  });
}

async function toggleWatchlist(movieId) {
  movieId = Number(movieId);
  const on = isInWatchlist(movieId);

  if (on) {
    // find watchlist entry ID and delete it
    const res = await fetch(`${WATCHLIST_URL}?movieId=${movieId}`);
    const items = await res.json();
    if (items[0]) {
      await fetch(`${WATCHLIST_URL}/${items[0].id}`, { method: "DELETE" });
    }
    watchlistSet.delete(movieId);
  } else {
    await fetch(WATCHLIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: movieId,
        addedAt: new Date().toISOString(),
      }),
    });
    watchlistSet.add(movieId);
  }

  // broadcast to anything listening
  window.dispatchEvent(
    new CustomEvent("watchlist:changed", {
      detail: { movieId, isOn: watchlistSet.has(movieId) },
    })
  );

  return watchlistSet.has(movieId);
}

// expose so details.js can use
window.watchlistStore = {
  loadWatchlist,
  isInWatchlist,
  toggleWatchlist,
};

function renderMovies(movies) {
  // update "Showing X movies"
  if (resultsCount) {
    resultsCount.textContent = `Showing ${movies.length} movie${movies.length === 1 ? "" : "s"
      }`;
  }

  // hide/show empty state
  if (emptyState) {
    emptyState.style.display = movies.length ? "none" : "block";
  }
  moviesGrid.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const saved = window.watchlistStore.isInWatchlist(movie.id);

    card.innerHTML = `
      <img class="movie-poster" src="${movie.image}" alt="Poster for ${movie.title
      }" />

      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-meta">${movie.genre} • ${movie.year}</p>
        <p class="movie-description">${movie.description}</p>
      

        <button class="watchlist-btn ${saved ? "saved" : ""}" data-id="${movie.id
      }">
          ${saved ? "✓ In Watchlist" : "+ Watchlist"}
        </button>
      </div>
    `;

    // Clicking the card opens details
    card.addEventListener("click", () => window.openMovieDetails(movie.id));

    // Clicking watchlist should NOT open modal
    const btn = card.querySelector(".watchlist-btn");
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);

      const isOn = await window.watchlistStore.toggleWatchlist(id);

      btn.textContent = isOn ? "✓ In Watchlist" : "+ Watchlist";
      btn.classList.toggle("saved", isOn);
    });

    moviesGrid.appendChild(card);
  });
}

function filterMovies(query) {
  const filtered = allMovies.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase()) ||
      m.genre.toLowerCase().includes(query.toLowerCase()) ||
      m.year.toString().includes(query)
  );
  renderMovies(filtered);
}

function wireSearch() {
  if (!searchInput) return;
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    filterMovies(query);
  });
}

async function init() {
  wireSearch();
  await loadWatchlist();
  await getMovies();
}

init();
