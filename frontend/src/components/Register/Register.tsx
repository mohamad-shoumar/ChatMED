import React from "react";
import { getAPI, postAPI, base_url } from "../API/API";
import "../../styles/Authentication/Register.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";



  return (
    <div className="form-container sign-up-container">
      <form>
        <h1 className="title">Create New Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div>
          <button className="btn-role" onClick={() => setRole("patient")}>
            Patient
          </button>
          <button className="btn-role" onClick={() => setRole("doctor")}>
            Doctor
          </button>
        </div>
        <div>
          <div className="gender-label">Gender:</div>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
        </div>

        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

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
          className="btn-signin ghost gradient-button gradient-button-1"
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
