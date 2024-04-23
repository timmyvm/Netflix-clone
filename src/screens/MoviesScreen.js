import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "../axios.js";
import Movie from "../Movie";
import "./MoviesScreen.css";
import GenreTags from "../GenreTags.js";
import requests from "../Request.js";
import { Link } from "react-router-dom";
import Avatar from "../../src/assets/download.png";
import NoPoster from "../../src/assets/FoxAndroidTM2's_No_Poster.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SkeletonMovie from "../SkeletonMovie.js";

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const fetchData = useCallback(async (fetchURL) => {
    try {
      const response = await axios.get(fetchURL);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }, []);

  const fetchMoviesByGenres = useCallback(async (sort) => {
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
      const movies = await fetchData(fetchURL + `&sort_by=${sort}`);
      movies.forEach((movie) => {
        if (!allMovies.some((existingMovie) => existingMovie.id === movie.id)) {
          allMovies.push(movie);
        }
      });
    }
    setMovies(allMovies);
  }, [fetchData]);

  const fetchMoviesSortedByRating = useCallback(async () => {
    try {
      const movies = await fetchData(
        requests.fetchTopRated + `&sort_by=vote_average.desc`
      );
      setMovies(movies);
    } catch (error) {
      console.error("Error fetching movies sorted by rating:", error);
      setMovies([]);
    }
  }, [fetchData]);

  const searchMovies = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

    try {
      if (searchTerm.trim() === "") {
        fetchMoviesByGenres(sortBy);
      } else {
        const response = await axios.get(searchURL);
        setMovies(response.data.results || []);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
    }
  }, [searchTerm, sortBy, fetchMoviesByGenres]);

  useEffect(() => {
    if (sortBy === "vote_average.desc") {
      fetchMoviesSortedByRating();
    } else {
      fetchMoviesByGenres(sortBy);
    }
  }, [sortBy, fetchMoviesByGenres, fetchMoviesSortedByRating]);

  const handleSearchTermChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSortByChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const debouncedSearchMovies = useMemo(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };
    return debounce(searchMovies, 300);
  }, [searchMovies]);

  useEffect(() => {
    debouncedSearchMovies();
  }, [debouncedSearchMovies]);

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
              onSubmit={(e) => debouncedSearchMovies(e)}
            >
              <input
                className="search__bar"
                type="text"
                placeholder="Search "
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <button type="submit" className="search__button">
                <FontAwesomeIcon className="faSearch" icon={faSearch} />
              </button>
            </form>

            <select
              className="filter___dropdown"
              onChange={handleSortByChange}
              value={sortBy}
            >
              <option
                className="filter___dropdown__option"
                value="popularity.desc"
              >
                Popular
              </option>
              <option
                className="filter___dropdown__option"
                value="vote_average.desc"
              >
                Rating
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
            {movies.length > 0
              ? movies.map((movie) => (
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    posterPath={
                      movie.poster_path ? movie.poster_path : NoPoster
                    }
                  />
                ))
              : Array.from({ length: 20 }).map((_, index) => (
                  <SkeletonMovie key={index} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesScreen;