import React from "react";
import styles from "../../styles/Consultation/Consultation.module.scss";
import { useState } from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import NavBar from "../../components/NavBar/NavBar";
import DoctorCard from "../../components/Card/Card";
import "../../Prime-theme/theme.css";
import { base_url } from "../../API/API";
import { API } from "../../../src/API/API";

const Consultation = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.mainContainer}>
        <SideNavBar />
        <div className={styles.rightSection}>
          <div className={styles.headerContainer}>
            <div className={styles.medicalHistoryTitle}>
              <h2>Consultations</h2>
            </div>
            <div className={styles.submitbtn}>search</div>
          </div>
          <div className={styles.medicalHistoryForm}>
            <div className={styles.top}>
              <DoctorCard />
            </div>
            <div className={styles.bot}>
              <div className={styles.botRight}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
                minus sapiente modi debitis rem maiores nemo qui corporis unde
                delectus eius, officia at suscipit quos voluptatum, expedita
                facilis explicabo ipsam.
              </div>
              <div className={styles.botLeft}>
                <div className={styles.symptoms}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Itaque minus sapiente modi debitis rem maiores nemo qui
                  corporis unde delectus eius, officia at suscipit quos
                  voluptatum, expedita facilis explicabo ipsam.
                </div>
                <div className={styles.response}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Itaque minus sapiente modi debitis rem maiores nemo qui
                  corporis unde delectus eius, officia at suscipit quos
                  voluptatum, expedita facilis explicabo ipsam.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
