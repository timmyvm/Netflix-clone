import React, { useRef, useState } from "react";
import "./loginScreen.css";
import SignUpScreen from "./SignUpScreen";
import { auth } from "../firebaseFile.js";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);

  const register = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const goSignIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt=""
          className="loginScreen__logo"
        />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sign in
        </button>
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <div className="signUpScreen">
              <form onSubmit={register}>
                <h1>Sign Up</h1>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                  className="signUpScreen__input"
                />
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  className="signUpScreen__input"
                />
                <button className="loginScreen__getStarted" type="submit">
                  Get Started Today!
                </button>
              </form>
              <h4 className="input__h4">
                Have an account already?
                <span className="input__h4__span" onClick={goSignIn}>
                  Login in!
                </span>
              </h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
