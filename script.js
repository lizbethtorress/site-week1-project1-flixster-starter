const apiKey = '395bdcd85c7bf090460abe9260fa8ea8';
let currentPage = 1;
let query = '';

function newUrl(pagenum){
  url = `https://api.themoviedb.org/3/movie/now_playing?&page=`+pagenum+'&api_key=' + apiKey
  return url
}

let apiUrl = newUrl(1)

//fetch the moveis from the api 
async function fetchMovies(url) {

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
    
  generateMovieCards(data.results)
}
  
  // Function to generate movie cards
  function generateMovieCards(movies) {
    const moviesGrid = document.getElementById('movies-grid');
  
    movies.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.setAttribute("class","movie-card");
  
      const title = document.createElement('h2');
      title.setAttribute("class",'movie-title');
      title.textContent = movie.title;
  
      const image = document.createElement('img');
      image.setAttribute("class",'movie-poster');
      image.src = `https://image.tmdb.org/t/p/original` + movie.poster_path;
  
      const votes = document.createElement('p');
      votes.setAttribute("class",'movie-votes');
      votes.textContent = `⭐️ ${movie.vote_count}`;
  
      movieCard.appendChild(image);
      movieCard.appendChild(votes);
      movieCard.appendChild(title);
  
      moviesGrid.appendChild(movieCard);
    });
  }

  async function loadMoreMovies() {
    currentPage++;
    apiUrl = newUrl(currentPage)
    fetchMovies(apiUrl);
  }
  document.addEventListener('load', async () => {
    const movies = await fetchMovies(currentPage);
    generateMovieCards(movies);
  });
  
  const loadMoreButton = document.getElementById('load-more-movies-btn');
  loadMoreButton.addEventListener('click', loadMoreMovies);

  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-button')
  const submitBtn = document.getElementById('search-form')
 
  submitBtn.addEventListener('submit', (searchAgain) => {
    const moviesGrid = document.getElementById('movies-grid');
    moviesGrid.innerHTML =''
    searchAgain.preventDefault();
    const searchNow = searchAgain.target.search.value;
    fetchMovies(`https://api.themoviedb.org/3/search/movie?&page=`+currentPage+`&query=`+searchNow+`&api_key=`+apiKey)
  })

  const clearBtn = document.getElementById('close-search-btn')

  function clearResults () {
    const moviesGrid = document.getElementById('movies-grid');
    moviesGrid.innerHTML =''
    query =''
    currentPage = 1
    fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?&page=`+currentPage+'&api_key=' + apiKey)
  }

  clearBtn.addEventListener('click', clearResults)

  window.onload = () => {
    fetchMovies(apiUrl)
  }
