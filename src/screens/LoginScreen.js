import React, { useState } from "react";
import LoginCSS from "./loginScreen.css";
import SignUpScreen from "./SignUpScreen";

const LoginScreen = () => {

const [signIn, setSignIn] = useState(false)

return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt=""
          className="loginScreen__logo"
        />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}> Sign in </button>
      </div>
      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen/>
        ) : (
          <>
            <h1 className="loginScreen__title">
              Unlimited films, TV Programmes and more.
            </h1>
            <h2 className="loginScreen__subtitle">
              Watch anywhere. Cancel at anytime.
            </h2>
            <h3 className="loginScreen__undertitle">
              Ready to watch? Enter your email to create or restart your membership.
            </h3>
            <div className="loginScreen__input">
              <form>
                <input className="loginScreen__input__input" type="email" placeholder="Email Address" />
                <button className="loginScreen__getStarted" onClick={() => setSignIn(true)}> Get Started</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default LoginScreen;
