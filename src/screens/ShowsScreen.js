import React, { useState, useEffect, useMemo } from "react";
import axios from "../axios.js";
import { Link, useParams } from "react-router-dom";
import Movie from "../Movie";
import TVShowsGenreTags from "../TVShowsGenreTags .js";
import Avatar from "../../src/assets/download.png";
import "./MoviesScreen.css";
import SkeletonMovie from "../SkeletonMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ShowsScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const { genre } = useParams();

  const fetchShows = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.results || [];
    } catch (error) {
      console.error("Error fetching shows:", error);
      return [];
    }
  };

  useEffect(() => {
    const initialRender = async () => {  
      const trendingURL = `https://api.themoviedb.org/3/trending/tv/week?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US`;
      try {
        const trendingShows = await fetchShows(trendingURL);
        setShows(trendingShows);
      } catch (error) {
        console.error("Error fetching trending shows:", error);
      }
    };
  
    initialRender();
  }, []);

  const fetchMoviesByGenres = async (genreId) => {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&with_genres=${genreId}&sort_by=${sortBy}&page=1&include_adult=false`;
    return fetchShows(url);
  };

  const fetchMoviesSortedByRating = async () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&page=1&include_adult=false`;
    return fetchShows(url);
  };

  const searchMovies = async () => {
    const searchURL = `https://api.themoviedb.org/3/search/tv?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    if (searchTerm.trim() === "") {
      fetchMoviesByGenres(genre).then((data) => setShows(data));
    } else {
      fetchShows(searchURL).then((data) => setShows(data));
    }
  };

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

  useEffect(() => {
    if (sortBy === "vote_average.desc") {
      fetchMoviesSortedByRating().then((data) => setShows(data));
    } else {
      fetchMoviesByGenres(genre).then((data) => setShows(data));
    }
  }, [sortBy, genre]);

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
            <form className="search__bar__container">
              <input
                className="search__bar"
                type="text"
                placeholder="Search "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button" className="search__button" onClick={debouncedSearchMovies}>
                <FontAwesomeIcon className="faSearch" icon={faSearch} />
              </button>
            </form>
            <select
              className="filter___dropdown"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option className="filter___dropdown__option" value="popularity.desc">Popular</option>
              <option className="filter___dropdown__option" value="vote_average.desc">Rating</option>
            </select>
          </div>
          <TVShowsGenreTags setShows={setShows} handleTagClick={fetchMoviesByGenres} />
          <h1 className="movies__title">
            {searchTerm ? `Search results for "${searchTerm}"` : "Popular TV Shows"}
          </h1>
          <div className="movies__content">
            {shows.length > 0 ? (
              shows.map((show) => (
                <Movie
                  key={show.id}
                  title={show.name}
                  posterPath={show.poster_path}
                />
              ))
            ) : (
              Array.from({ length: 20 }).map((_, index) => (
                <SkeletonMovie key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowsScreen;
