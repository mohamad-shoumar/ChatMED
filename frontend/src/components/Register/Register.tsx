import React from "react";
import { API } from "../../API/API";
import { base_url } from "../../API/API";
import style from "../../styles/Authentication/Register.module.scss";
import styles from "../../styles/Authentication/Authentication.module.scss";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  let nav = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const data = {
      fullName: fullname,
      gender: gender,
      role: role,
      email: email,
      password: password,
    };
    const url = `${base_url}auth/register`;
    console.log("Data: ", data);
    console.log("URL: ", url);
    try {
      const response = await API.postAPI(url, data);
      console.log("Response: ", response);
      toast.success(`You Are Now Registered.`);
      if (response.data.message === "Success") {
        toast.success(`You Are Now Registered.`);
        setFullName("");
        setEmail("");
        setPassword("");
        nav("/medicalhistory");
      } else {
        toast.error("Error signing up.");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error signing up.");
    }
  };
  return (
    <div
      className={styles["form-container"] + " " + styles["sign-up-container"]}
    >
      <form>
        <h1 className={styles.title}>Create New Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.input}
        />

        {/* <div>
          <div className={style["gender-label"]}>Gender:</div>
          <div className={style["gender-options"]}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                className={style.input}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
                className={style.input}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={(e) => setGender(e.target.value)}
                className={styles.input}
              />
              Other
            </label>
          </div>
        </div> */}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <div>
          <div className={style["gender-label"]}>Role:</div>

          <div className={style["btn-options"]}>
            <label>
              <input
                type="radio"
                name="role"
                value="patient"
                onChange={(e) => setRole("patient")}
                className={style.input}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                onChange={(e) => setRole("doctor")}
                className={style.input}
              />
              Doctor
            </label>
          </div>
        </div>

        <button
          className={`${styles["btn-signin"]} ${styles["ghost-signup"]} ${styles["gradient-button"]} ${styles["gradient-button-1"]}`}
          id="sup"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
