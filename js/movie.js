console.log("Скрипт страницы фильма загружен!");

// Получаем id из URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Путь к файлу data.json
const jsonUrl = '../data/data.json';

fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            console.error('Ошибка загрузки данных:', response.status);
            throw new Error('Ошибка загрузки данных');
        }
        return response.json();
    })
    .then(data => {
        const movie = data.items.find(item => item.id == movieId);
        
        if (movie) {
            // Заполняем страницу данными о фильме
            document.getElementById('movie-name').textContent = movie.name;
            document.getElementById('movie-description').textContent = movie.description;
            document.getElementById('movie-actors').textContent = `Actors: ${movie.actors || 'Unknown'}`;
            document.getElementById('movie-trivia').textContent = `Trivia: ${movie.trivia || 'No trivia available'}`;
            document.getElementById('movie-poster').src = movie.poster;
            document.getElementById('movie-poster').alt = movie.name;
        } else {
            console.error('Movie not found!');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
