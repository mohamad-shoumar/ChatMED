import React from "react";
import "../../styles/Authentication/LogIn.css";
import "../../styles/Authentication/Authentication.css";
import { getAPI, postAPI, base_url } from "../API/API";
import { useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



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
