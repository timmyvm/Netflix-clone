const API_KEY = "3ef16179b4be2afc7c81bf6333abb5b5";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

// https://api.themoviedb.org/3//trending/all/week?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US

//https://api.themoviedb.org/3//discover/movie?api_key=3ef16179b4be2afc7c81bf6333abb5b5&with_genres=99

export default requests;

// https://api.themoviedb.org/3/genre/movie/list?api_key=3ef16179b4be2afc7c81bf6333abb5b5