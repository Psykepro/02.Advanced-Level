var imdb = imdb || {};

(function (scope) {
	function loadHtml(selector, data) {
		var container = document.querySelector(selector),
			moviesContainer = document.getElementById('movies'),
			detailsContainer = document.getElementById('details'),
			genresUl = loadGenres(data);

		container.appendChild(genresUl);

		genresUl.addEventListener('click', function (ev) {
			if (ev.target.tagName === 'LI') {
				var genreId,
					genre,
					moviesHtml;

				genreId = parseInt(ev.target.getAttribute('data-id'));
				genre = data.filter(function (genre) {
					return genre._id === genreId;
				})[0];

				moviesHtml = loadMovies(genre.getMovies());
				moviesContainer.innerHTML = moviesHtml.outerHTML;
				moviesContainer.setAttribute('data-genre-id', genreId);

				// Task 2 - Add event listener for movies boxes
				var ulElementWithMovies = Array.prototype.slice.call(moviesContainer.getElementsByTagName('ul')[0].childNodes);

				ulElementWithMovies.forEach(function(liElement){
					liElement.addEventListener('click', function() {

						while (detailsContainer.firstElementChild) {
							detailsContainer.removeChild(detailsContainer.firstElementChild);
						}

						var movieId = this.getAttribute('data-id'),
							clickedMovie = genre.getMovies().filter(function (currentMovie) {
								return currentMovie._id == movieId;
							})[0],
							actors = clickedMovie.getActors(),
							reviews = clickedMovie.getReviews(),
							actorsFragment = document.createDocumentFragment(),
							reviewsFragment = document.createDocumentFragment(),
							actorsH3 = document.createElement('h3'),
							reviewsH3 = document.createElement('h3'),
							actorsUl = document.createElement('ul'),
							reviewsUl = document.createElement('ul');

						// Generate Actors Part \\
						actorsH3.innerHTML = 'Actors';
						actorsFragment.appendChild(actorsH3);
						actors.forEach(function(currentActor){
							var li = document.createElement('li'),
								h4 = document.createElement('h4'),
								p = document.createElement('p');
							h4.innerHTML = currentActor.name;
							li.appendChild(h4);
							p.innerHTML = '<strong>Bio: </strong>' + currentActor.bio + '<br/>' + '<strong>Born: </strong>' + currentActor.born;
							li.appendChild(p);
							actorsUl.appendChild(li);
						});
						actorsFragment.appendChild(actorsUl);

						// Generate Reviews Part \\
						reviewsH3.innerHTML = 'Reviews';
						reviewsFragment.appendChild(reviewsH3);
						reviews.forEach(function(currentReview){
							var li = document.createElement('li'),
								h4 = document.createElement('h4'),
								p = document.createElement('p'),
								deleteButton = document.createElement('button');
							h4.innerHTML = currentReview.author;
							li.appendChild(h4);
							p.innerHTML = 'Bio: ' + currentReview.content + '<br/>' + 'Born: ' + currentReview.date;
							li.appendChild(p);
							// Task 3 - Add event listener for delete button (delete movie button or delete review button)
							deleteButton.innerHTML = 'Delete review';
							li.appendChild(deleteButton);
							deleteButton.addEventListener('click', function(){
								reviewsUl.removeChild(li);
								clickedMovie.deleteReview(currentReview);
							});
							reviewsUl.appendChild(li);
						});
						reviewsFragment.appendChild(reviewsUl);

						detailsContainer.appendChild(actorsFragment);
						detailsContainer.appendChild(reviewsFragment);
					})
				});
			}
		});


	}

	function loadGenres(genres) {
		var genresUl = document.createElement('ul');
		genresUl.setAttribute('class', 'nav navbar-nav');
		genres.forEach(function (genre) {
			var liGenre = document.createElement('li');
			liGenre.innerHTML = genre.name;
			liGenre.setAttribute('data-id', genre._id);
			genresUl.appendChild(liGenre);
		});

		return genresUl;
	}

	function loadMovies(movies) {
		var moviesUl = document.createElement('ul');
		movies.forEach(function (movie) {
			var liMovie = document.createElement('li');
			liMovie.setAttribute('data-id', movie._id);

			liMovie.innerHTML = '<h3>' + movie.title + '</h3>';
			liMovie.innerHTML += '<div>Country: ' + movie.country + '</div>';
			liMovie.innerHTML += '<div>Time: ' + movie.length + '</div>';
			liMovie.innerHTML += '<div>Rating: ' + movie.rating + '</div>';
			liMovie.innerHTML += '<div>Actors: ' + movie._actors.length + '</div>';
			liMovie.innerHTML += '<div>Reviews: ' + movie._reviews.length + '</div>';
			
			moviesUl.appendChild(liMovie);
		});

		return moviesUl;
	}

	scope.loadHtml = loadHtml;
}(imdb));