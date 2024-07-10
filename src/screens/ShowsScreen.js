import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "../axios.js";
import requests from "../Request.js";
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

  const fetchData = useCallback(async (fetchURL) => {
    try {
      const response = await axios.get(fetchURL);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }, []);

  const fetchShowsByGenres = useCallback(
    async (sort) => {
      const fetchURLs = [
        requests.fetchTrendingTV,
        requests.fetchTopRatedTV,
        requests.fetchActionTVShows,
        requests.fetchComedyTVShows,
        requests.fetchHorrorTVShows,
        requests.fetchRomanceTVShows,
        requests.fetchDocumentaryTVShows,
      ];

      const allShows = [];
      for (const fetchURL of fetchURLs) {
        const shows = await fetchData(`${fetchURL}&sort_by=${sort}`);
        shows.forEach((show) => {
          if (!allShows.some((existingShow) => existingShow.id === show.id)) {
            allShows.push(show);
          }
        });
      }
      setShows(allShows);
    },
    [fetchData]
  );

  const fetchShowsSortedByRating = useCallback(async () => {
    try {
      const shows = await fetchData(
        `${requests.fetchTopRatedTV}&sort_by=vote_average.desc`
      );
      setShows(shows);
    } catch (error) {
      console.error("Error fetching shows sorted by rating:", error);
      setShows([]);
    }
  }, [fetchData]);

  const searchShows = useCallback(
    async (e) => {
      if (e) {
        e.preventDefault();
      }

      const searchURL = `https://api.themoviedb.org/3/search/tv?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

      try {
        if (searchTerm.trim() === "") {
          fetchShowsByGenres(sortBy);
        } else {
          const response = await axios.get(searchURL);
          setShows(response.data.results || []);
        }
      } catch (error) {
        console.error("Error searching shows:", error);
        setShows([]);
      }
    },
    [searchTerm, sortBy, fetchShowsByGenres]
  );

  useEffect(() => {
    if (sortBy === "vote_average.desc") {
      fetchShowsSortedByRating();
    } else {
      fetchShowsByGenres(sortBy);
    }
  }, [sortBy, fetchShowsByGenres, fetchShowsSortedByRating]);

  const handleSearchTermChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSortByChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const debouncedSearchShows = useMemo(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };
    return debounce(searchShows, 300);
  }, [searchShows]);

  useEffect(() => {
    debouncedSearchShows();
  }, [debouncedSearchShows]);

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
              onSubmit={(e) => debouncedSearchShows(e)}
            >
              <input
                className="search__bar"
                type="text"
                placeholder="Search "
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <button
                type="button"
                className="search__button"
                onClick={debouncedSearchShows}
              >
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
          <TVShowsGenreTags setShows={setShows} />
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
                    posterPath={show.poster_path}
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
