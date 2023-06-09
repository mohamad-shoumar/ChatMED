import React, { useEffect } from "react";
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
  const emailInputRef = useRef<HTMLInputElement>(null!);
  const passwordInputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);
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
        window.location.reload();
      } else {
        nav("/docdashboard");
        window.location.reload();
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
          ref={emailInputRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              passwordInputRef.current?.focus();
            }
          }}
        />
        <input
          type="password"
          ref={passwordInputRef}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignin(e);
            }
          }}
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
