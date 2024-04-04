import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";

const Row = ({ title, fetchURL, isLargeRow = false, isBigger = false }) => {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const requests = await axios.get(fetchURL);
      setMovies(requests.data.results);
      return requests;
    }

    fetchData();
  }, [fetchURL]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies &&
          movies.map((movie) =>
            (isLargeRow && movie.poster_path) ||
            (isBigger && movie.backdrop_path) ? (
              <>
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
              </>
            ) : null
          )}
      </div>
    </div>
  );
};

export default Row;
