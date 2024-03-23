import React, { useEffect, useState } from "react";
import NavCSS from "./Nav.css";
import { Link } from "react-router-dom";
import Avatar from "../src/assets/download.png"

const Nav = () => {
  const [show, handleShow] = useState(false);

  const TransitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", TransitionNavBar);
    return () => window.removeEventListener("scroll", TransitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <Link to={"/"}>
          <img
            className="nav__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          />
        </Link>

        <Link to={"/profile"}>
          <img
            className="nav__avatar"
            src={Avatar}
          />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
