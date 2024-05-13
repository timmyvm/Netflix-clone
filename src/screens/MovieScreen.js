import React, { useState, useEffect } from "react";
import "./MovieScreen.css";
import Movie from "../../src/Movie";
import Avatar from "../../src/assets/download.png";
import { Link } from "react-router-dom";

export default function MovieScreen() {

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US&page=1"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

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


     

    </>
  );
}
