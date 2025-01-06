console.log("Скрипт загружен!");
const jsonUrl = './data/data.json';  // Путь к файлу data.json в той же папке

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
            
            const name = document.createElement('h2');
            name.classList.add('movie-name');
            
            // Создаем ссылку на страницу фильма
            const link = document.createElement('a');
            link.href = `html/movie.html?id=${item.id}`;  // Путь к странице фильма
            link.textContent = item.name;  // Название фильма
            name.appendChild(link);
            
            movieDiv.appendChild(name);

            const description = document.createElement('p');
            description.classList.add('movie-description');
            description.textContent = item.description;
            movieDiv.appendChild(description);

            const poster = document.createElement('img');
            poster.classList.add('movie-poster');
            poster.src = item.poster;
            poster.alt = item.name;
            movieDiv.appendChild(poster);

            movieList.appendChild(movieDiv);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
