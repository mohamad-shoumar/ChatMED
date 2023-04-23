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
import MedicalHistorySections from "../../components/MedicalHistorySections/MedicalHistorySections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [medications, setMedications] = useState<
    { name: string; frequency: string }[]
  >([]);
  const [surgeries, setSurgeries] = useState<{ name: string; date: number }[]>(
    []
  );
  const [allergies, setAllergies] = useState<{ name: string; date: number }[]>(
    []
  );
  const [chronicConditions, setChronicConditions] = useState<
    { name: string; date: number }[]
  >([]);
  const [medicalHistoryData, setMedicalHistoryData] = useState<any>({
    height: "",
    weight: "",
    dateOfBirth: "",
    medications: [],
    surgeries: [],
    allergies: [],
    chronicConditions: [],
  });

  const handleUpdateMedications = (
    medications: { name: string; frequency: string }[]
  ) => {
    console.log("Medications updated:", medications);
    setMedicalHistoryData({ ...medicalHistoryData, medications: medications });
  };

  const handleMedicalHistorySubmit = () => {
    console.log("Medical history data:", medicalHistoryData);
  };

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
              <Button
                variant="contained"
                color="secondary"
                onClick={handleMedicalHistorySubmit}
              >
                <Typography variant="button">Sumbit</Typography>
              </Button>
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
                <MedicalHistorySections
                  title="Surgery"
                  data={surgeries}
                  setData={setSurgeries}
                />
                <MedicalHistorySections
                  title="Allergies"
                  data={allergies}
                  setData={setAllergies}
                />
                <MedicalHistorySections
                  title="Chronic Conditions"
                  data={chronicConditions}
                  setData={setChronicConditions}
                />
              </div>
              <div>
                <MedicalHistorySection
                  onUpdateMedications={handleUpdateMedications}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
