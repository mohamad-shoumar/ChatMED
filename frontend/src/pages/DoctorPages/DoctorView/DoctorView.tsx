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
import Radar from "../../../components/Radar/Radar";
import BasicDemo from "../../../components/BloodPressureChart/BloodPressureChart";
import ComboDemo from "../../../components/ComboGraph/ComboGraph";
import avatar from "../../../assets/nour.jpg";
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
          {/* <Search /> */}
        </div>
        <div className={styles.body}>
          <div className={styles.bodyheader}>
            <div className={styles.title}>Patient Profile</div>
          </div>
          <div className={styles.bodycontent}>
            <div className={styles.uppersection}>
              <div className={styles.bodyuser}>
                <div className={styles.bodyuserdetails}>
                  <img src={avatar} alt="Avatar" />
                  <h5>Nour Mshawrab</h5>
                  <p>ID: 9172876387</p>
                  <div>Age:25</div>
                </div>
              </div>

              <div className={styles.infocontainer}>
                <InforCard
                  Gender="female"
                  Allergies="Nasal"
                  Surgeries={"None"}
                  Diseases={"Diabetes 2005"}
                />
              </div>
              <div className={styles.bodycomposition}>
                <div className={styles.bodyWeight}>
                  <Height image={weight} title="Weight" value={63} unit="kg" />
                </div>
                <div className={styles.bodyHeight}>
                  <Height image={height} title="Height" value={160} unit="cm" />
                </div>
              </div>
            </div>
            <div className={styles.lowerection}>
              <div className={styles.info}>
                <div className={styles.infoheader}>
                  <div className={styles.infoheaderleft}>
                    Vitals and Health Status
                  </div>
                  <div className={styles.grpahs}>
                    {/* <BasicDemo /> */}
                    <ComboDemo />
                  </div>
                </div>
              </div>
              <div className={styles.radarContainer}>
                <div className={styles.radar}>
                  <Radar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorView;
