import React, { useState, useEffect } from "react";
import "./Movie.css";
import { Link } from "react-router-dom";

const Movie = ({ title, posterPath }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [mediaType, setMediaType] = useState(null);
  const [mediaId, setMediaId] = useState(null);

  useEffect(() => {
    const fetchMediaTypeAndId = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
            title
          )}&api_key=3ef16179b4be2afc7c81bf6333abb5b5`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          // Find the exact match for the title
          const exactMatch = data.results.find(
            (result) => result.title === title || result.name === title
          );
          if (exactMatch) {
            setMediaType(exactMatch.media_type);
            setMediaId(exactMatch.id);
            console.log(
              `Exact match found: ${exactMatch.media_type}, ID: ${exactMatch.id}`
            );
          } else {
            console.warn(`No exact match found for title: ${title}`);
          }
        } else {
          console.warn(`No results found for title: ${title}`);
        }
      } catch (error) {
        console.error("Error fetching media type and ID:", error);
      }
    };

    fetchMediaTypeAndId();
  }, [title]);

  const generateLink = () => {
    if (mediaType === "movie") {
      return `/movie/${mediaId}`;
    } else if (mediaType === "tv") {
      return `/tv/${mediaId}`;
    }
    return "#";
  };

  return (
    <div className="movie">
      <Link to={generateLink()}>
        <img
          className="movie__poster"
          src={base_url + posterPath}
          alt="Movie Poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_1000.jpg";
          }}
          onClick={() => console.log(`Navigating to: ${generateLink()}`)}
        />
      </Link>
    </div>
  );
};

export default Movie;
