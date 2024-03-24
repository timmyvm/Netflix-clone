import React, { useState } from "react";
import "./loginScreen.css";
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
            <div className="loginScreen__input">
              <form>
                <button className="loginScreen__getStarted" onClick={() => setSignIn(true)}> Get Started Today!</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default LoginScreen;
