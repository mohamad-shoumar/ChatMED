import React, { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SideNavBar from "../../../components/SideNavBar/SideNavBar";
import styles from "../../../styles/Doctor/Dashboard.module.scss";
import ".././../../Prime-theme/theme.css";
import { Card } from "@mui/material";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import docpic from "../../../assets/DocDash/docpic.png";
import { text } from "stream/consumers";
import RowExpansionDemo from "../../../components/PatientsTable/PatientsTable";

const DoctorDashboard = () => {
  const [date, setDate] = useState<string | Date | Date[] | null>(null);

  return (
    <div>
      <NavBar />
      <div className={styles.global}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <div className={styles.details}>
              <div>
                <img className={styles.imgDoc} src={docpic} alt="" />
              </div>
              {/* <div className={styles.text}> */}
              <h6>Welcome Back, (Dr John Doe)!</h6>
              <p>Wish You Have a Nice Day</p>
              {/* </div> */}
            </div>
          </div>
          <div className={styles.topRight}>
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
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.title}>
            <h4>My patients</h4>
          </div>
          <RowExpansionDemo />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
