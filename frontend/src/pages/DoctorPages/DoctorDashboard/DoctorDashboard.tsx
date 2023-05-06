import React, { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SideNavBar from "../../../components/SideNavBar/SideNavBar";
import styles from "../../../styles/Doctor/Dashboard.module.scss";
import ".././../../Prime-theme/theme.css";
import { Card } from "@mui/material";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import docpic from "../../../assets/DocDash/docpic.png";
import { text } from "stream/consumers";
import RowExpansionDemo from "../../../components/PatientsTable/PatientsTable";
import { API } from "../../../API/API";
import { base_url } from "../../../API/API";

interface Doctor {
  id: number;
  displayName: string;
  email: string;
  imageUrl: string;
}

const DoctorDashboard = () => {
  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAdviceData = async () => {
      try {
        const response = await API.getAPI(
          `${base_url}doctor/getprofile`,
          token!
        );
        console.log(response);
        setDoctor(response);
      } catch (error) {
        console.log(error);
      }
    };

    // const fetchPatientData = async () => {
    //   try {
    //     const response = await API.getAPI(`${base_url}patient/profile`, token!);
    //     console.log(response);
    //     setPatient(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    fetchAdviceData();
    // fetchPatientData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className={styles.global}>
        {/* <div className={styles.top}> */}
        <div className={styles.topLeft}>
          <div className={styles.details}>
            <div>
              <img
                className={styles.imgDoc}
                src={doctor?.imageUrl}
                alt="image of doctor"
              />
            </div>
            {/* <div className={styles.text}> */}
            <h4>{`Welcome Back, ${doctor?.displayName} !`}</h4>
            <h6>Wish You a Nice Day</h6>
            {/* </div> */}
          </div>
        </div>
        {/* <div className={styles.topRight}>
            <Calendar
              value={date}
              onChange={(e: CalendarChangeEvent) => setDate(e.value ?? null)}
              inline
              showWeek
              style={{
                transform: "scale(1)",
                height: "100%",
                border: " 1px solid black",
              }}
            />
          </div> */}
        {/* </div> */}

        <div className={styles.bottom}>
          <RowExpansionDemo />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
