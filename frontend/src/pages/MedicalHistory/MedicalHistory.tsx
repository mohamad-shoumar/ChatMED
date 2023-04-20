import React from "react";
import styles from "../../styles/MedicalHistory/MedicalHistory.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { NumericFormat } from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Register from "../../components/Register/Register";
import LogIn from "../../components/LogIn/LogIn";

const MedicalHistory = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const [radio, setRadio] = useState(true);

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

            <div className={styles.sectionsMain}>
              <div className={styles.sections}>
                <div className={styles.section1}>
                  <div className={styles.section1Title}>
                    <h3>
                      What are the medications that you’re currently taking?
                    </h3>
                  </div>
                  <div className={styles.section1Radio}>
                    <label>
                      <input
                        type="radio"
                        name="Not Applicable"
                        value={"notApplicable"}
                        onChange={(e) => setRadio(false)}
                      />
                      Not Applicable
                    </label>
                  </div>
                  <div className={styles.section1Input}>
                    <div className={styles.section1Input1}>
                      <h3>Medication</h3>
                      <input
                        type="text"
                        placeholder="Medication Name"
                        disabled={radio}
                      />
                    </div>
                    <div className={styles.section1Input2}>
                      <h3>Frequency</h3>
                      <input
                        type="text"
                        placeholder="Frequency"
                        disabled={radio}
                      />
                    </div>
                    <div className={styles.section1AddBtn}>
                      <button className={styles.addBtn} disabled={radio}>
                        Add
                        <FontAwesomeIcon icon="plus" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
