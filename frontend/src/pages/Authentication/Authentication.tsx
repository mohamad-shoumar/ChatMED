import { useState } from "react";
import "../../styles/Authentication/Authentication.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { FC } from "react";
import Register from "../../components/Register/Register";
import LogIn from "../../components/LogIn/LogIn";

const Authentication: FC = () => {
  let nav = useNavigate();
  const [swap, setSwap] = useState<boolean>(true);
  return (
    <div className="wholeContainer">
      <div
        className={swap ? "container" : "container right-panel-active"}
        id="container"
      >
        <Register />
        <LogIn />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">Thank you for choosing ChatMED! </h1>
              <p className="text">
                If you already have an account please sign in
              </p>
              <button
                onClick={() => {
                  setSwap(!swap);
                }}
                className="btn-signin ghost gradient-button gradient-button-1"
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">Welcome to ChatMed! </h1>
              <p className="text">
                Experience personalized healthcare with our AI-powered platform.{" "}
              </p>
              <button
                onClick={() => {
                  setSwap(!swap);
                }}
                className="btn-signin ghost gradient-button gradient-button-1 "
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
