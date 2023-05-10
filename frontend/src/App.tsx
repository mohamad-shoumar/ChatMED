import React from "react";
import logo from "./logo.svg";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Authentication from "./pages/Authentication/Authentication";
import MedicalHistory from "./pages/MedicalHistory/MedicalHistory";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import PatientDashboard from "./pages/PatientDashboard/PatientDashboard";
import Vitals from "./pages/Vitals/Vitals";
import Consultation from "./pages/Consultation/Consultation";
import Chats from "./pages/ChatPage/ChatPage";
import { useContext, ReactNode } from "react";
import { AuthContext } from "./context/AuthContext";
import jwt_decode from "jwt-decode";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import DoctorDashboard from "./pages/DoctorPages/DoctorDashboard/DoctorDashboard";
import DoctorProfile from "./pages/DoctorPages/DoctorProfile/DoctorProfile";
import DoctorView from "./pages/DoctorPages/DoctorView/DoctorView";
import LandingPage from "./pages/LandingPage/LandingPage";
import { JwtPayload } from "jsonwebtoken";
import NavBar from "./components/NavBar/NavBar";
type ProtectedRouteProps = {
  children: ReactNode;
  currentUser: any;
};

function App() {
  const token = localStorage.getItem("token") ?? "";
  let user: JwtPayload | null = null;

  if (token) {
    user = jwt_decode(token) as JwtPayload;
  }

  return (
    <BrowserRouter>
      {user && (user.role === "patient" || user.role === "doctor") && (
        <NavBar />
      )}
      <Routes>
        <Route path="authentication" element={<Authentication />} />
        <Route path="/" element={<LandingPage />} />
        {user && user.role === "patient" && (
          <>
            <Route path="chat" element={<Chats />} />
            <Route path="medicalhistory" element={<MedicalHistory />} />
            <Route path="patientprofile" element={<PatientProfile />} />
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="vitals" element={<Vitals />} />
            <Route path="consultation" element={<Consultation />} />
          </>
        )}
        {user && user.role === "doctor" && (
          <>
            <Route path="chat" element={<Chats />} />
            <Route path="docdashboard" element={<DoctorDashboard />} />
            <Route path="doctorprofile" element={<DoctorProfile />} />
            <Route path="doctorview" element={<DoctorView />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// const ProtectedRoute = ({ children, currentUser }: ProtectedRouteProps) => {
//   if (!currentUser) {
//     return <Navigate to="/authentication" />;
//   }

//   return children;
// };
