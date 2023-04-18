import { useState } from "react";
import "../../styles/Authentication/Authentication.module.scss";
import styles from "../../styles/Authentication/Authentication.module.scss";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { FC } from "react";
import Register from "../../components/Register/Register";
import LogIn from "../../components/LogIn/LogIn";

const Authentication = () => {
  const [swap, setSwap] = useState(false);

  return (
    <div className={styles.wholeContainer}>
      <div
        className={`${styles.container} ${
          swap ? "" : styles["right-panel-active"]
        }`}
        id="container"
      >
        <Register />
        <LogIn />
        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div
              className={styles["overlay-panel"] + " " + styles["overlay-left"]}
            >
              <h1 className={styles.title}>Thank you for choosing ChatMED! </h1>
              <p className={styles.text}>
                If you already have an account please sign in
              </p>
              <button
                onClick={() => {
                  setSwap(!swap);
                }}
                className={`${styles["btn-signin"]} ${styles.ghost} ${styles["gradient-button"]} ${styles["gradient-button-1"]}`}
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div
              className={
                styles["overlay-panel"] + " " + styles["overlay-right"]
              }
            >
              <h1 className={styles.title}>Welcome to ChatMed! </h1>
              <p className={styles.text}>
                Experience personalized healthcare with our AI-powered platform.{" "}
              </p>
              <button
                onClick={() => {
                  setSwap(!swap);
                }}
                className={`${styles["btn-signin"]} ${styles.ghost} ${styles["gradient-button"]} ${styles["gradient-button-1"]}`}
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
