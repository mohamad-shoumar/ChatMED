import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import styles from "../../styles/PatientDash/PatientDash.module.scss";
import { DateRange } from "@mui/icons-material";
import { Card } from "primereact/card";
import BloodPressure from "../../components/BarGraph/BarGraph";
import BloodSugar from "../../components/BloodSugarGraph/BloodSugarGraph";
import { Chart } from "primereact/chart";
import { API } from "../../API/API";
import { base_url } from "../../API/API";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import sun from "../../assets/sidebar/sun.png";

interface Patient {
  _id: number;
  displayName: string;
  email: string;
  imageUrl: string;
}
interface SideNavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientDashboard = () => {
  const [advices, setAdvices] = useState("");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const token = localStorage.getItem("token");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchAdviceData = async () => {
      try {
        console.log("hello");
        const response = await API.getAPI(`${base_url}advice`, token!);

        console.log("advicedata", response.data);

        setAdvices(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPatientData = async () => {
      try {
        const response = await API.getAPI(`${base_url}patient/profile`, token!);
        setPatient(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdviceData();
    fetchPatientData();
  }, []);
  console.log(patient);
  return (
    <div>
      <div className={`${styles.main}`}>
        <SideNavBar />

        <div className={styles.mainContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.profile}>
              <img alt="" className={styles.img} src={patient?.imageUrl} />
              <div className={styles.info}>
                <p className={styles.name}>{patient?.displayName}</p>
                <div className={styles.email}>
                  <p className={styles.deanCom}>Email: {patient?.email}</p>
                </div>
                <p className={styles.id}>ID: {patient?._id}</p>
              </div>
            </div>
            <div className={styles.adviceMain}>
              <Card style={{ maxHeight: "93%" }} title="Tip of the Day">
                <div className={styles.divBack}>
                  <p className={styles.advice}>{advices}</p>
                </div>
              </Card>
            </div>
          </div>
          <div className={styles.mainForm}>
            <div className={styles.formHeader}>
              <p className={styles.formTitle}>Blood Pressure</p>
            </div>
            <BloodPressure />
            <div className={styles.formHeader}>
              <p className={styles.formTitle}>Blood Sugar</p>
            </div>
            <BloodSugar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
