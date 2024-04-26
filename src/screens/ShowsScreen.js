import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import requests from "../Request.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Movie from "../Movie";
import { Link } from "react-router-dom";
import TVShowsGenreTags from "../TVShowsGenreTags .js"; 
import Avatar from "../../src/assets/download.png";
import "./MoviesScreen.css";
import SkeletonMovie from "../SkeletonMovie";

const ShowsScreen = ({ setMovies }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const { genre } = useParams();

  const fetchMoviesByGenres = async (genreId) => {
    const URL = `https://api.themoviedb.org/3/discover/tv?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&with_genres=${genreId}&sort_by=${sortBy}&page=1&include_adult=false`;

    try {
      const response = await axios.get(URL);
      setShows(response.data.results || []);
    } catch (error) {
      console.error("Error fetching shows by genre:", error);
      setShows([]);
    }
  };

  const handleTagClick = async (id) => {
    fetchMoviesByGenres(id);
  };

  const fetchMoviesSortedByRating = async () => {
    const URL = `https://api.themoviedb.org/3/tv/popular?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&page=1&include_adult=false`;

    try {
      const response = await axios.get(URL);
      setShows(response.data.results || []);
    } catch (error) {
      console.error("Error fetching shows sorted by rating:", error);
      setShows([]);
    }
  };

  const searchMovies = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const searchURL = `https://api.themoviedb.org/3/search/tv?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

    try {
      if (searchTerm.trim() === "") {
        fetchMoviesByGenres(genre);
      } else {
        const response = await axios.get(searchURL);
        setShows(response.data.results || []);
      }
    } catch (error) {
      console.error("Error searching shows:", error);
      setShows([]);
    }
  };

  useEffect(() => {
    if (sortBy === "vote_average.desc") {
      fetchMoviesSortedByRating();
    } else {
      fetchMoviesByGenres(genre);
    }
  }, [sortBy]);

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
              <h3 className="navM__link current">TV Shows</h3>
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

            <select
              className="filter___dropdown"
              onChange={(e) => setSortBy(e.target.value)}
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

         
          <TVShowsGenreTags setShows={setShows} handleTagClick={handleTagClick} />

          <h1 className="movies__title">
            {searchTerm
              ? `Search results for "${searchTerm}"`
              : "Popular TV Shows"}
          </h1>

          <div className="movies__content">
            {shows.length > 0
              ? shows.map((show) => (
                  <Movie
                    key={show.id}
                    title={show.name}
                    posterPath={`https://image.tmdb.org/t/p/original${show.poster_path}`}
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

export default ShowsScreen;
