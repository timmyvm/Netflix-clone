import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios.js";
import Avatar from "../../src/assets/download.png";
import "./MovieScreen.css";
import LoadingScreen from "./LoadingScreen.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Movie from "../Movie.js";

const MovieScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          ` https://api.themoviedb.org/3/movie/${id}?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US `
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  const getRecommendedMovies = useCallback(async () => {
    if (!movie) return;

    try {
      const res = await axios.get(
        ` https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&page=1 `
      );

      if (res.data.results.length === 0) {
        console.log("using similar instead");
        const res2 = await axios.get(
          ` https://api.themoviedb.org/3/movie/${id}/similar?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&page=1 `
        );
        setRecommendedMovies(res2.data.results.slice(0, 4));
      } else {
        setRecommendedMovies(res.data.results.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    }
  }, [id, movie]);

  useEffect(() => {
    getRecommendedMovies();
  }, [movie, getRecommendedMovies]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <>
      <nav>
        <div className="navM__contents">
          <div className="navM__left">
            <Link to="/">
              <img
                className="navM__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt="Netflix Logo"
              />
            </Link>
            <Link to="/movies">
              <h3 className="navM__link">Movies</h3>
            </Link>
            <Link to="/shows">
              <h3 className="navM__link current">movie Shows</h3>
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <img className="navM__avatar" src={Avatar} alt="Profile Avatar" />
            </Link>
          </div>
        </div>
      </nav>

      <div
        className="movie-screen"
        style={{
          ...(movie?.backdrop_path
            ? {
                backgroundImage: (
                  `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                ),
              }
            : {}),
        }}
      >
        <div className="container_movie">
          <div className="movie-image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="movie-details">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-info">
              <p className="movie-language">
                {movie.original_language?.toUpperCase()}
              </p>
              <p className="movie-genres">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="movie-runtime">
                <FontAwesomeIcon icon={faClock} /> {movie.run_time}{" "}
                Episodes
              </p>
            </div>
            <div className="movie-overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
            <div className="movie-meta">
              <div className="movie-release-date">
                Release Date: {movie.first_air_date}
              </div>
              <div className="movie-rating">Rating: {movie.vote_average}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="recco-container">
        <h2 className="recco-title">Recommended Movies</h2>
        <div className="recommended-movies">
          {recommendedMovies.map((recommendedMovie) => (
            <Movie
              key={recommendedMovie.id}
              title={recommendedMovie.title}
              posterPath={recommendedMovie.poster_path}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieScreen;
