import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";

const Row = ({ title, fetchURL, isLargeRow = false, isBigger = false }) => {
  const [movies, setMovies] = useState([]);
  const [scrollX, setScrollX] = useState(0); // Track horizontal scroll position

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(fetchURL);
      setMovies(requests.data.results);
      return requests;
    }

    fetchData();
  }, [fetchURL]);

  const handleLeftArrowClick = (id) => {
    const row = document.getElementById(`row-container-${id}`);
    row.scrollLeft -= row.offsetWidth / 2; // Scroll half the width of the container
    setScrollX(row.scrollLeft);
  };
  
  const handleRightArrowClick = (id) => {
    const row = document.getElementById(`row-container-${id}`);
    row.scrollLeft += row.offsetWidth / 2; // Scroll half the width of the container
    setScrollX(row.scrollLeft);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters" id={`row-container-${title}`}>
        {movies &&
          movies.map((movie) =>
            (isLargeRow && movie.poster_path) ||
            (isBigger && movie.backdrop_path) ? (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"} ${
                  isBigger && "isBiggerPoster"
                }`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            ) : null
          )}
      </div>

      {/* Navigation Buttons */}
      <button
        className="arrow left"
        onClick={() => handleLeftArrowClick(title)}
      >
        {"<"}
      </button>
      <button
        className="arrow right"
        onClick={() => handleRightArrowClick(title)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Row;
