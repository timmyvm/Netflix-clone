import React from "react";
import "./Movie.css"; // Import CSS for styling

const Movie = ({ title, posterPath }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="movie">
      <img
        className="movie__poster"
        src={base_url + posterPath}
        alt={title}
      />
    </div>
  );
};

export default Movie;