document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const movieContainer = document.getElementById('movieContainer');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchMovies(query);
        } else {
            alert('Please enter a movie name');
        }
    });

    const fetchMovies = async (query) => {
        const apiKey = 'fde29ea';  // Replace with your OMDB API key
        const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                displayError(data.Error);
            }
        } catch (error) {
            displayError('An error occurred while fetching data');
        }
    };

    const displayMovies = (movies) => {
        movieContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
            `;
            movieContainer.appendChild(movieCard);
        });
    };

    const displayError = (message) => {
        movieContainer.innerHTML = `<p>${message}</p>`;
    };
});
