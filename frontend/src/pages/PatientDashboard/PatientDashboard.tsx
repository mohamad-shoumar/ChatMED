import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import styles from "../../styles/PatientDash/PatientDash.module.scss";
import { DateRange } from "@mui/icons-material";
import { Card } from "primereact/card";

const PatientDashboard = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <SideNavBar />
        <div className={styles.mainContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.profile}>
              <img
                alt=""
                className={styles.img}
                src="https://static.overlay-tech.com/assets/b1b8ea57-988b-464a-81f3-b90aa14bf0ce.png"
              />
              <div className={styles.info}>
                <p className={styles.name}>Alexander Dean</p>
                <div className={styles.email}>
                  <p className={styles.deanCom}>
                    <strong className={styles.deanComEmphasis0}>Dean</strong>
                    &#64;gmail.com
                  </p>
                  <div className={styles.dateicon}>
                    <DateRange className={styles.dateRange} />
                    <p className={styles.date}>25/05/1998</p>
                  </div>
                </div>
                <div className={styles.editbtn}>
                  <p className={styles.edit}>Edit</p>
                </div>
              </div>
            </div>
            <div className={styles.adviceMain}>
              <div className={styles.adviceHeader}>
                {/* <p className={styles.adviceTitle}>Tip of the Day</p> */}
                <div className={styles.advice}>
                  <div className="card">
                    <Card title="Tip of the Day" className="md:w-25rem">
                      <p className="m-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mainForm}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
