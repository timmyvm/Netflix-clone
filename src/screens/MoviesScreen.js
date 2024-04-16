import React, { useEffect, useState } from "react";
import axios from "../axios.js";
import Movie from "../Movie";
import "./MoviesScreen.css";
import GenreTags from '../GenreTags.js'
import requests from "../Request.js";
import { Link } from "react-router-dom";
import Avatar from "../../src/assets/download.png";
import NoPoster from "../../src/assets/FoxAndroidTM2's_No_Poster.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      const movies = await fetchData(fetchURL);
      movies.forEach((movie) => {
        if (!allMovies.some((existingMovie) => existingMovie.id === movie.id)) {
          allMovies.push(movie);
        }
      }); 
    }
    setMovies(allMovies);
  };

  const searchMovies = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

    try {
      if (searchTerm.trim() === "") {
        fetchMoviesByGenres();
      } else {
        const response = await axios.get(searchURL);
        setMovies(response.data.results || []);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMoviesByGenres();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(searchMovies, 300);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <>
      <nav>
        <div className="navM__contents">
          <div className="navM__left">
            <Link to={"/"}>
              <img
                className="navM__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt="Netflix Logo"
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
              <img className="navM__avatar" src={Avatar} alt="Profile Avatar" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="moviesScreen">
        <div className="container">
          <div className="above__title">
            <form
              className="search__bar__container"
              onSubmit={(e) => searchMovies(e)}
            >
              <input
                className="search__bar"
                type="text"
                placeholder="Search "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search__button">
                <FontAwesomeIcon className="faSearch" icon={faSearch} />
              </button>
            </form>

            <select className="filter___dropdown">
              <option
                className="filter___dropdown__option"
                value="Popular"
                defaultValue
              >
                Popular
              </option>
              <option className="filter___dropdown__option" value="Rating">
                Rating
              </option>
              <option className="filter___dropdown__option" value="AZ">
                A-Z
              </option>
              <option className="filter___dropdown__option" value="Oldest">
                Oldest
              </option>
              <option className="filter___dropdown__option" value="Newest">
                Newest
              </option>
            </select>
          </div>

          <GenreTags setMovies={setMovies} />

          <h1 className="movies__title">
            {searchTerm
              ? `Search results for "${searchTerm}"`
              : "Popular movies"}
          </h1>

          <div className="movies__content">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path ? movie.poster_path : NoPoster}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesScreen;
