console.log("Скрипт загружен!");
const jsonUrl = './data/data.json'; // Путь к файлу data.json в той же папке
const ratingImg = document.createElement('img')



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
            
            

            const poster = document.createElement('img');
            poster.classList.add('movie-poster');
            poster.src = item.poster;
            poster.alt = item.name;
            movieDiv.appendChild(poster);

            // Создаем ссылку на страницу фильма
            const link = document.createElement('a');
            link.href = `html/movie.html?id=${item.id}`; // Путь к странице фильма
            link.textContent = item.name; // Название фильма
            name.appendChild(link);
            movieDiv.appendChild(name);

            const description = document.createElement('p');
            description.classList.add('movie-description');
            description.textContent = item.description;
            movieDiv.appendChild(description);

            
            // Добавляем блок с информацией о фильме
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('movie-info');

            const rating = document.createElement('div');
            rating.classList.add('rating');
            rating.textContent = `☆ ${item.rating.toFixed(1)}`;

            if(item.rating < 2.0){
                rating.style.backgroundColor = "#eb160f"
            }else if(item.rating < 7.0){
                rating.style.backgroundColor = "#752dff"
            }else{
                rating.style.backgroundColor = "#009e53"
            }

            const genre = document.createElement('div');
            genre.classList.add('genre');
            genre.textContent = `🎞: ${item.genre}`;

            const duration = document.createElement('div');
            duration.classList.add('duration');
            duration.textContent = `⏱ ${item.duration}`;

            infoDiv.appendChild(rating);
            infoDiv.appendChild(genre);
            infoDiv.appendChild(duration);

            movieDiv.appendChild(infoDiv);
            movieList.appendChild(movieDiv);

        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });