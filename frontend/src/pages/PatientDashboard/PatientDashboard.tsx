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

interface Patient {
  id: number;
  displayName: string;
  email: string;
  imageUrl: string;
}

const PatientDashboard = () => {
  const [advices, setAdvices] = useState("");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAdviceData = async () => {
      try {
        const response = await API.getAPI(`${base_url}advice`, token!);
        console.log(response.data);
        const advicesString = JSON.stringify(response.data.advice);
        setAdvices(advicesString);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPatientData = async () => {
      try {
        const response = await API.getAPI(`${base_url}patient/profile`, token!);
        console.log(response);
        setPatient(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdviceData();
    fetchPatientData();
  }, []);

  return (
    <div>
      <NavBar />

      <div className={styles.main}>
        <SideNavBar />
        <div className={styles.mainContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.profile}>
              <img alt="" className={styles.img} src={patient?.imageUrl} />
              <div className={styles.info}>
                <p className={styles.name}>{patient?.displayName}</p>
                <div className={styles.email}>
                  <p className={styles.deanCom}>
                    {patient?.email}
                    {/* <strong className={styles.deanComEmphasis0}>Dean</strong>
                    &#64;gmail.com */}
                  </p>
                  {/* <div className={styles.dateicon}>
                    <DateRange className={styles.dateRange} />
                    <p className={styles.date}> </p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className={styles.adviceMain}>
              <Card style={{ minHeight: "95%" }} title="Tip of the Day">
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
