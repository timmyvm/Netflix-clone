import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios.js";
import Avatar from "../../src/assets/download.png";
import "./MovieScreen.css";

const MovieScreen = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=3ef16179b4be2afc7c81bf6333abb5b5&language=en-US`
        );
        const data = response.data;
        console.log(data);
        // set your state here with the data, if you want to display it
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

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
              <h3 className="navM__link current">TV Shows</h3>
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <img className="navM__avatar" src={Avatar} alt="Profile Avatar" />
            </Link>
          </div>
        </div>
      </nav>
     

     
    </>
  );
};

export default MovieScreen;
