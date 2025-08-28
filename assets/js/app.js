// API key & URL
let API_KEY = '1c768e4f';
let API_URL = 'https://www.omdbapi.com/';

let searchInput = document.getElementById('searchInput');
let loading = document.getElementById('loading');
let error = document.getElementById('error');
let movieContainer = document.getElementById('movieContainer');
let popup = document.getElementById('popup');

// Enter key press for search
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMovies();
    }
});

// Movie search function
function searchMovies() {
    const movieName = searchInput.value.trim();

    // API call
    const url = `${API_URL}?apikey=${API_KEY}&s=${movieName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            hideLoading();

            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                showError('No movies found! Try a different name.');
            }
        })
        .catch(err => {
            hideLoading();
            showError('Something went wrong. Please try again.');
            console.error('Error:', err);
        });
}

// Movies display function
function displayMovies(movies) {
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.onclick = () => showMovieDetails(movie.imdbID);

        movieCard.innerHTML = `
                    ${movie.Poster !== 'N/A' ?
                `<img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">` :
                `<div class="no-poster">🎬</div>`
            }
                    <div class="movie-title">${movie.Title}</div>
                    <div class="movie-year">${movie.Year}</div>
                `;

        movieContainer.appendChild(movieCard);
    });
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function clearMovies() {
    movieContainer.innerHTML = '';
}