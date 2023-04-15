import React from "react";
import "../../styles/Authentication/LogIn.css";
import "../../styles/Authentication/Authentication.css";
import { getAPI, postAPI, base_url } from "../API/API";
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
    const data_signin = { email: email, password: password };
    const url = `${base_url}auth/login`,
      response = await postAPI(url, data_signin);
    const token = response.token;
    console.log(response);
    localStorage.setItem("token", token);
    let user: JwtPayload = jwt_decode(token);
    console.log(user);

    console.log(user.role);
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
    <div className="form-container sign-in-container">
      <form>
        <h1 className="title">Sign In</h1>
        <span className="span">Already have an account? </span>
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
          className="btn-signin ghost gradient-button gradient-button-1"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
