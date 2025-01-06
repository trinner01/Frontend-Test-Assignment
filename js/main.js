console.log("Скрипт загружен!");

const jsonUrl = './data/data.json'; // Путь к файлу data.json в той же папке

fetch(jsonUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const movieList = document.querySelector('.movie-list');
        
        data.items.forEach(item => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            
            // Создаём ссылку на фильм
            const movieLink = document.createElement('a');
            movieLink.href = `/html/movie.html?id=${item.id}`; // Формируем ссылку с параметром id
            movieLink.classList.add('movie-link');

            const name = document.createElement('h2');
            name.classList.add('movie-name');
            name.textContent = item.name;
            movieLink.appendChild(name);

            const poster = document.createElement('img');
            poster.classList.add('movie-poster');
            poster.src = item.poster;
            poster.alt = item.name;
            movieLink.appendChild(poster);

            const description = document.createElement('p');
            description.classList.add('movie-description');
            description.textContent = item.description;
            movieLink.appendChild(description);

            movieDiv.appendChild(movieLink);
            movieList.appendChild(movieDiv);
        });
    })
    .catch(error => {
        console.error('There was a проблема with the fetch operation:', error);
    });
