import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import HomeMovie from "./HomeMovie";

const Row = ({ title, fetchURL, isLargeRow, isBigger}) => {
  const [movies, setMovies] = useState([]);
  const [scrollX, setScrollX] = useState(0); // Track horizontal scroll position

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
            (isBigger && movie.poster_path) ? (
              <HomeMovie
                key={movie.id}
                title={movie.name || movie.title}
                posterPath={movie.poster_path}
                backdropPath={movie.backdrop_path}
                isLargeRow={isLargeRow}
                isBigger={isBigger}
              />
            ) : null
          )}
      </div>
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
