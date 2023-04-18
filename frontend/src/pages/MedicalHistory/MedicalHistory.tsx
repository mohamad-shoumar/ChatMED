import React from "react";
import styles from "../../styles/MedicalHistory/MedicalHistory.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Register from "../../components/Register/Register";
import LogIn from "../../components/LogIn/LogIn";

const MedicalHistory = () => {
  const [dateOfBirth, setDateOfBirth] = useState(null);

  return (
    <div>
      <NavBar />
      <div className={styles.medicalHistory}>
        <SideNavBar />
        <div className={styles.medicalHistoryContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.medicalHistoryTitle}>
              <h2>Medical History</h2>
            </div>
            <div className={styles.submitbtn}>
              <button className={styles.submit}>Submit</button>
            </div>
          </div>
          <div className={styles.medicalHistoryForm}>
            <div className={styles.height}>
              <h3>Height</h3>
              <input type="text" placeholder="Height" />
            </div>
            <div className={styles.weight}>
              <h3>Weight</h3>
              <input type="text" placeholder="Weight" />
            </div>
            <div className={styles.dob}>
              <h3>Date of Birth</h3>
              <DatePicker
                selected={dateOfBirth}
                onChange={(date: any) => setDateOfBirth(date)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
