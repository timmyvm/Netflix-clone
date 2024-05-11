import React, { useState } from "react";
import "./Movie.css";
import { Link } from "react-router-dom";

const Movie = ({ title, posterPath }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [mediaType, setMediaType] = useState(null);

  const handleMovieClick = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${title}&api_key=3ef16179b4be2afc7c81bf6333abb5b5`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const type = data.results[0].media_type;
        setMediaType(type);

        if (type === "movie") {
          console.log("This is a movie");
        } else if (type === "tv") {
          console.log("This is a TV show");
        }
      }
    } catch (error) {
      console.error("Error fetching media type:", error);
    }
  };

  return (
    <div className="movie" onClick={handleMovieClick}>
      {mediaType && (
        <Link to={mediaType === "movie" ? "/movie" : "/tv"}>
          <img
            className="movie__poster"
            src={base_url + posterPath}
            alt={title}
          />
        </Link>
      )}
    </div>
  );
};

export default Movie;
