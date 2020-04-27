//Home page view

window.onload= function () {

            const moviesContainer = document.querySelector('.movie-container');
            const MOVIE_API = 'e7707e9f1597a41331c10d51170bfb2a';
            const MOVIE_EP = 'https://api.themoviedb.org';
            const MOVIE_IMAGE = 'https://image.tmdb.org/t/p/w500';

            const log = console.log;

            //Generates Movie Path URL
            function generateMovieDBUrl(path) {
                    const url = `${MOVIE_EP}/3${path}?api_key=${MOVIE_API}`;
                    return url;
                }

                //Fetches data from url
                function requestMovies(url, onComplete) {
                        fetch(url)
                            .then((res) => res.json())
                            .then(onComplete)
                    }

                //API to get movies now playing
                function getPlayingMovies() {
                        const url = generateMovieDBUrl(`/movie/now_playing`);
                        const render = renderMovies.bind({ title: 'Now Playing' })
                        requestMovies(url, render, handleGeneralError);
                    }

            
                //API to get top movies
                  function getTopMovies() {
                        const url = generateMovieDBUrl(`/movie/top_rated`);
                        const render = renderMovies.bind({ title: 'Top Rated' })
                        requestMovies(url, render, handleGeneralError);
                    }
                    
                    //API to get popular movies
                    function getPopularMovies() {
                        const url = generateMovieDBUrl('/movie/popular');
                        const render = renderMovies.bind({ title: 'Popular Movies' })
                        requestMovies(url, render, handleGeneralError);
                    }
                    
                    //API to get upcoming movies
                    function getUpcomingMovies() {
                        const url = generateMovieDBUrl('/movie/upcoming');
                        const render = renderMovies.bind({ title: 'Upcoming Movies' })
                        requestMovies(url, render , handleGeneralError);
                    }

                    //Error handling 
                    function handleGeneralError(error) {
                        log('Error: ', error.message);
                        alert(error.message || 'Internal Server');
                        }
                        
                    //Render movies builder
                    function renderMovies(data) { 
                        const movies = data.results;
                        const moviesBlock = createMovieContainer(movies, this.title);                           
                        moviesContainer.appendChild(moviesBlock);
                    }

            //Movie section builder
             function movieSection(movies) {
                return movies.map((movie) => {
                   if (movie.poster_path) {
                        return `<a href='/search/movie?movieID=${movie.id}'> 
                        <img 
                            src=${MOVIE_IMAGE + movie.poster_path} 
                            data-movie-id=${movie.id}>
                             </a> `                 
                        ;
                   }
                })
             }
        
        //Movie container
        function createMovieContainer(movies, title='') {
                  const movieElement = document.createElement('div');
                  movieElement.setAttribute('class', 'movie');
                
                   const movieTemplate = `
                    <h2 class="title is-2">${title}</h2>
                   <section class="section">
                    ${movieSection(movies)}
                    </section>       
                    `;
                 
                movieElement.innerHTML = movieTemplate;
                return movieElement;            
        }
              
getPlayingMovies();
getPopularMovies();
getUpcomingMovies();
getTopMovies(); 
}

