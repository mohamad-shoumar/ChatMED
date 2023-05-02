import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import styles from "../../styles/Vitals/Vitals.module.scss";
import { Button } from "primereact/button";
import "../../Prime-theme/theme.css";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { API } from "../../API/API";
import { base_url } from "../../API/API";
import BloodSugarTable from "../../components/BloodSugarTable/BloodSugarTable";

const Vitals = () => {
  const [sys, setSys] = useState<number | null | undefined>(20);
  const [dais, setDais] = useState<number | null | undefined>(20);
  const [sugar, setSugar] = useState<number | null | undefined>(20);
  return (
    <>
      <div className={styles.global}>
        <NavBar />
      </div>

      <div className={styles.mainContainer}>
        <SideNavBar />
        <div className={styles.rightSection}>
          <div className={styles.headerContainer}>
            <h2>Vitals</h2>
            <div className={styles.headerButtons}>
              <Button
                severity="secondary"
                style={{ marginRight: "2rem" }}
                label="Submit"
                size="small"
              />
            </div>
          </div>
          <div className={styles.mainContent}>
            <BloodSugarTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Vitals;
