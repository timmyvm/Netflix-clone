import React, { useRef } from "react";
import signUpCSS from "./SignUpScreen.css";
import { auth } from "../firebaseFile.js";

const SignUpScreen = (  ) => {
  const register = (event) => {
    event.preventDefault();

    auth
      .createUseWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser)
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (event) => {
    event.preventDefault();
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign In</h1>
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
        <button type="submit" className="input__button" onClick={signIn}>
          Sign in
        </button>

        <h4 className="input__h4">
          New to Netflix?{" "}
          <span className="input__h4__span" onClick={register}>
            Sign Up Now.
          </span>{" "}
        </h4>
      </form>
    </div>
  );
};

export default SignUpScreen;
