const API_URL = "http://localhost:3000/movies";
const moviesGrid = document.getElementById("movies-grid");


async function getMovies() {
    try {
        const response = await fetch(API_URL);
        const movies = await response.json();
        renderMovies(movies);
}catch(error){
      console.error("Error fetching data:", error);
    }
};