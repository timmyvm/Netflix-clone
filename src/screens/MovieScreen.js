import React from 'react'
import'./MovieScreen.css'
import'./MoviesScreen.css'
import Avatar from "../../src/assets/download.png";
import { Link } from 'react-router-dom'

export default function MovieScreen() {
  return (
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
  )
}
