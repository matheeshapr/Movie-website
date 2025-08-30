// API key & URL
let API_KEY = '1c768e4f';
let API_URL = 'https://www.omdbapi.com/';

let searchInput = document.getElementById('searchInput');
let movieContainer = document.getElementById('movieContainer');

//Search Movie 
async function searchMovies() {
    let movieName = searchInput.value.trim();

    let url = API_URL + '?apikey=' + API_KEY + '&t=' + movieName;

    let response = await fetch(url);
    let data = await response.json();

    if (data.Response === 'True') {
        displayMovie(data);
    } else {
        movieContainer.innerHTML = '<p>No movie found! Try a different name.</p>';
    }
}

// Movie display 
function displayMovie(movie) {
    movieContainer.innerHTML = ''; // Clear previous content

    let movieDetails = document.createElement('div');
    movieDetails.className = 'movie-post';
    movieDetails.innerHTML = `
        ${movie.Poster !== 'N/A' ?
            `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">` :
            `<div class="no-poster">🎬</div>`
        }
        <div class="movie-title">${movie.Title}</div>
        <div class="movie-year">${movie.Year}</div>

        <div class="detail-info">
                        <p><strong>Genre:</strong> ${movie.Genre}</p>
                        <p><strong>Director:</strong> ${movie.Director}</p>
                        <p><strong>Actors:</strong> ${movie.Actors}</p>
                        <p><strong>Plot:</strong> ${movie.Plot}</p>
                        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                        <p><strong>Language:</strong> ${movie.Language}</p>
                        <p><strong>Country:</strong> ${movie.Country}</p>
                        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}/10</p>
                        <p><strong>Awards:</strong> ${movie.Awards}</p>
        </div>
    `;
    console.log(movie.Title);

    movieContainer.appendChild(movieDetails);
}