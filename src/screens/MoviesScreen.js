import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import Movie from "../Movie";
import "./MoviesScreen.css";
import requests from "../Request.js";
import Nav from "../Nav.js";
import { Link } from "react-router-dom";
import Avatar from "../../src/assets/download.png";

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);

  const fetchData = async (fetchURL) => {
    try {
      const response = await axios.get(fetchURL);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchMoviesByGenres = async () => {
    const fetchURLs = [
      requests.fetchTrending,
      requests.fetchTopRated,
      requests.fetchActionMovies,
      requests.fetchComedyMovies,
      requests.fetchHorrorMovies,
      requests.fetchRomanceMovies,
      requests.fetchDocumentaries,
    ];

    const allMovies = [];
    for (const fetchURL of fetchURLs) {
      allMovies.push(...(await fetchData(fetchURL)));
    }
    setMovies(allMovies);
  };

  useEffect(() => {
    fetchMoviesByGenres();
  }, []);

  return (
    <>
      <nav>
        <div className="navM__contents">
          <div className="navM__left">
            <Link to={"/"}>
              <img
                className="navM__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              />
            </Link>

            <Link to={"/movies"}>
              <h3 className="navM__link">Movies</h3>
            </Link>
            <Link to={"/shows"}>
              <h3 className="navM__link">Shows</h3>
            </Link>
          </div>

          <div>
            <Link to={"/profile"}>
              <img className="navM__avatar" src={Avatar} />
            </Link>
          </div>
        </div>
      </nav>

      <div className="moviesScreen">
        <div className="container">
          <h1 className="movies__title">Popular movies</h1>
          <div className="movies__content">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesScreen;
