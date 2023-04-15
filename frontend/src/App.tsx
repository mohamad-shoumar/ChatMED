import React from "react";
import logo from "./logo.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
