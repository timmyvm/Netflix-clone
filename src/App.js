import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebaseFile";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./app/features/counter/userSlice";
import ProfileScreen from "./screens/ProfileScreen";
import ShowsScreen from "./screens/ShowsScreen";
import MoviesScreen from "./screens/MoviesScreen";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/movies" element={<MoviesScreen/>}/>
            <Route path="/shows" element={<ShowsScreen/>}/>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
