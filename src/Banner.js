import React, { useEffect, useState } from "react";
import BannerCSS from "./Banner.css";
import axios from "./axios.js";
import requests from "./Request.js";

const Banner = () => {
  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }

  const [movie, setMovie] = useState(null); // Initialize movie as null

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        const selectedMovie = results[randomIndex];
        setMovie(selectedMovie);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Render null when movie is empty to avoid errors
  if (!movie) return null;

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
        <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__desc">{truncate(`${movie?.overview}`, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
