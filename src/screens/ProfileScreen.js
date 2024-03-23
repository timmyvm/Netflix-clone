import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import Avatar from "../../src/assets/download.png";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/counter/userSlice";
import { auth } from "../firebaseFile";
import PlanScreen from "./PlanScreen";

const ProfileScreen = () => {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1 className="profileScreen__body__title">Edit profile</h1>
        <div className="profileScreen__body__info">
          <img src={Avatar} alt="" />
          <div className="profileScreen__body__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__body__plans">
              <h3>Plans</h3>
              <PlanScreen/>
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__body__signout__button"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
