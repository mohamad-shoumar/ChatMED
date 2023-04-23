import React from "react";
import styles from "../../styles/MedicalHistory/MedicalHistory.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MedicalHistorySection from "../../components/MedicalHistorySection/MedicalHistorySection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [medications, setMedications] = useState<
    { name: string; frequency: string }[]
  >([]);

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
              <NumericFormat
                placeholder="Height"
                allowNegative={false}
                decimalScale={2}
                suffix="cm"
                customInput={(props: any) => <input {...props} type="text" />}
              />
            </div>
            <div className={styles.weight}>
              <h3>Weight</h3>
              <NumericFormat
                placeholder="Weight"
                allowNegative={false}
                decimalScale={2}
                suffix="kg"
                customInput={(props: any) => <input {...props} type="text" />}
              />
            </div>
            <div className={styles.dob}>
              <h3>Date of Birth</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                isClearable
              />
            </div>
          </div>

          <div className={styles.sectionsMain}>
            <div className={styles.sections}>
              <div>
                <MedicalHistorySection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
