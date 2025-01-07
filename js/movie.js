console.log("Скрипт загружен!");

// Получаем ID фильма из параметра URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Проверяем, что ID присутствует
if (!movieId) {
    console.error("ID фильма отсутствует в URL");
} else {
    const jsonUrl = '../data/detail.json'; // Путь к файлу detail.json

    // Загружаем данные из detail.json
    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки файла detail.json");
            }
            return response.json();
        })
        .then(data => {
            // Найдем фильм по ID
            const movie = data.find(item => item.id == movieId);

            if (!movie) {
                console.error("Фильм с таким ID не найден");
                return;
            }

            // Отображаем данные фильма
            document.querySelector(".movie-poster").src = movie.poster;
            document.querySelector(".movie-poster").alt = movie.name;
            document.querySelector(".movie-name").textContent = movie.name;
            document.querySelector(".movie-description").textContent = movie.description;
            document.querySelector(".movie-duration").textContent = `Duration: ${movie.duration}`;
            document.querySelector(".movie-rating").textContent = `Rating: ${movie.rating}`;
            document.querySelector(".movie-genre").textContent = `Genre: ${movie.genre}`;

            // Trivia
            const triviaList = document.querySelector(".movie-trivia");
            movie.trivia.forEach(triviaItem => {
                const li = document.createElement("li");
                li.textContent = triviaItem;
                triviaList.appendChild(li);
            });

            // Actors
            const actorsList = document.querySelector(".movie-actors");
            movie.actors.forEach(actor => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="https://www.imdb.com/name/${actor.imdb_id}" target="_blank">${actor.name}</a>`;
                actorsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Ошибка при обработке данных:", error);
        });
}
