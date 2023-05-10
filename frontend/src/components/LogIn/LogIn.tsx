import React from "react";
import "../../styles/Authentication/LogIn.module.scss";
import "../../styles/Authentication/Authentication.module.scss";
import styles from "../../styles/Authentication/Authentication.module.scss";
import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";
import { useState, useRef } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { auth } from "../../FireBaseChat";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let nav = useNavigate();
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "warn",
      summary: "warn",
      detail: "Error Occured!",
    });
  };
  const handleSignin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user2 = auth.currentUser;
      console.log(user2);
      const api_data = { email: email, password: password };
      const response = await API.postAPI(`${base_url}auth/login`, api_data);
      const token = response.token;
      console.log(token);
      console.log(response);
      localStorage.setItem("token", token);
      let user: JwtPayload = jwt_decode(token);
      console.log(user);

      if (user.role === "patient") {
        nav("/dashboard");
      } else {
        nav("/docdashboard");
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Error Occured!",
        detail: `Wrong email or password.`,
        sticky: true,
      });
    }
  };

  return (
    <div
      className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
    >
      <Toast ref={toast} />
      <form>
        <h1 className={styles.title2}>Sign In</h1>
        <span className={styles.span}>Don't have an account? sign up </span>

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
