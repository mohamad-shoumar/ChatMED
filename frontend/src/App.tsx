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

import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import DoctorDashboard from "./pages/DoctorPages/DoctorDashboard/DoctorDashboard";
import DoctorProfile from "./pages/DoctorPages/DoctorProfile/DoctorProfile";
type ProtectedRouteProps = {
  children: ReactNode;
  currentUser: any;
};

const ProtectedRoute = ({ children, currentUser }: ProtectedRouteProps) => {
  if (!currentUser) {
    return <Navigate to="/authentication" />;
  }

  return children;
};
function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="authentication" element={<Authentication />} />
        <Route path="/patient/*">
          <Route path="chat" element={<Chats />} />
          <Route path="medicalhistory" element={<MedicalHistory />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="vitals" element={<Vitals />} />
          <Route path="consultation" element={<Consultation />} />
        </Route>
        <Route path="/doctor/*">
          <Route path="chat" element={<Chats />} />
          <Route path="authentication" element={<Authentication />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
