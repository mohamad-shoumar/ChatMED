import React from "react";
import "../../styles/Authentication/LogIn.module.scss";
import "../../styles/Authentication/Authentication.module.scss";
import styles from "../../styles/Authentication/Authentication.module.scss";
import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";
import { useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();
  const handleSignin = async (e: any) => {
    e.preventDefault();
    const api_data = { email: email, password: password };
    const response = await API.postAPI(`${base_url}auth/login`, api_data);
    const token = response.token;
    console.log(response);
    localStorage.setItem("token", token);
    let user: JwtPayload = jwt_decode(token);
    try {
      if (user.role === "pateint") {
        toast.success(`You Are Now Logged in.`);
        nav("/pateint");
      } else {
        toast.success(`You Are Now Logged in.`);
        nav("/doctor");
      }
      setEmail("");
      setPassword("");
    } catch {
      console.log("error");
      toast.error("Failed.");
    }
  };

  return (
    <div
      className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
    >
      <form>
        <h1 className={styles.title2}>Sign In</h1>
        <span className={styles.span}>Already have an account? </span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignin}
          className={`${styles["btn-signin"]} ${styles.ghost} ${styles["gradient-button"]} ${styles["gradient-button-1"]}`}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
