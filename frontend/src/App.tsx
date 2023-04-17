import React from "react";
import logo from "./logo.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import MedicalHistory from "./pages/MedicalHistory/MedicalHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/medical-history" element={<MedicalHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
