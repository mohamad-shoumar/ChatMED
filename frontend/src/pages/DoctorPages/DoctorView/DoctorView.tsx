import React from "react";
import NavBar from "../../../components/NavBar/NavBar";
import styles from "../../../styles/Doctor/DoctorView.module.scss";
import { Card } from "primereact/card";
import { API } from "../../../API/API";
import { base_url } from "../../../API/API";
import Search from "../../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Button } from "primereact/button";
import { Height } from "../../../components/Height/Height";
import height from "../../../assets/height.png";
import weight from "../../../assets/weight.png";
import InforCard from "../../../components/InfoCard/InforCard";
const DoctorView = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.header}>
          <Button
            style={{
              backgroundColor: "lightgrey",
              color: "#000000",
              borderRadius: "50px",
              border: "none",
            }}
            icon="pi pi-arrow-left"
            onClick={() => navigate("/docdashboard")}
            className="p-button-text"
          />
          <div style={{ fontWeight: "Bold" }}>Back to Dashboard</div>
          <Search />
        </div>
