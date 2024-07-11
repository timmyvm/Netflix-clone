import React, { useEffect, useState } from "react";
import BannerCSS from "./Banner.css";
import axios from "./axios.js";
import requests from "./Request.js";
import { Link } from "react-router-dom";

const Banner = () => {
  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchTrending);
      const results = response.data.results;
      const randomIndex = Math.floor(Math.random() * results.length);
      const selectedMovie = results[randomIndex];
      setMovie(selectedMovie);
    }

    fetchData();
  }, []);

  console.log(movie);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.name}
        </h1>
        <div className="banner__buttons">
          <Link to={`/movie/${movie.id}`}>
            <button className="banner__button">Discover</button>
          </Link>
        </div>
        <h1 className="banner__desc">{movie?.overview}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
