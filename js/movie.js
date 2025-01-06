console.log("Скрипт для movie.html загружен!");

const jsonUrl = '../data/data.json'; // Путь к файлу data.json
const movieDetailsContainer = document.querySelector('.movie-details');

// Функция для получения параметра id из URL
function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Загружаем фильм
fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const movieId = getMovieIdFromUrl(); // Получаем id фильма из URL
        const movie = data.items.find(item => item.id == movieId); // Находим фильм по id

        if (!movie) {
            movieDetailsContainer.innerHTML = '<p>Фильм не найден.</p>';
            return;
        }

        // Создаём HTML для фильма
        const movieHtml = `
            <h1>${movie.name}</h1>
            <img src="${movie.poster}" alt="${movie.name}" class="movie-poster">
            <p class="movie-description">${movie.description}</p>
            <p><strong>Жанр:</strong> ${movie.genre}</p>
            <p><strong>Длительность:</strong> ${movie.duration}</p>
            <p><strong>Рейтинг:</strong> ${movie.rating}</p>
        `;

        // Добавляем фильм в контейнер
        movieDetailsContainer.innerHTML = movieHtml;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        movieDetailsContainer.innerHTML = '<p>Ошибка загрузки данных о фильме.</p>';
    });
