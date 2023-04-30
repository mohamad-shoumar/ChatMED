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
              <Button label="Submit" size="small" />
            </div>
          </div>
          <div className={styles.mainContent}>
            {/* <div className={styles.inputsContainer}>
              <div className={styles.pressureInput}>
                <div className={styles.pressureVertical}>
                  <h6>Enter BloodPressure</h6>
                  <div className={styles.pressureHorizantal}>
                    <div>
                      <label htmlFor="mmHg" className="font-bold block mb-2">
                        Systolic Pressure
                      </label>
                      <InputNumber
                        inputId="mmHg"
                        value={sys}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setSys(e.value)
                        }
                        suffix=" mmHg"
                      />
                    </div>
                    <div>
                      <label htmlFor="mmHg" className="font-bold block mb-2">
                        Daistolic Pressure
                      </label>
                      <InputNumber
                        inputId="mmHg"
                        value={dais}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setDais(e.value)
                        }
                        suffix=" mmHg"
                      />
                    </div>
                    <Button
                      label="Submit"
                      size="small"
                      className="mt-5 mb-4 "
                    />
                  </div>
                </div>
              </div>
              <div className={styles.pressureInput}>
                <div className={styles.pressureVertical}>
                  <h6>Enter Blood Glucose</h6>
                  <div className={styles.pressureHorizantal}>
                    <div>
                      <label htmlFor="mg/dL" className="font-bold block mb-2 ">
                        Glucose Level
                      </label>
                      <InputNumber
                        inputId="mg/dL"
                        value={sugar}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setSugar(e.value)
                        }
                        suffix=" mg/dL"
                      />
                    </div>
                    <Button
                      label="Submit"
                      size="small"
                      className="mt-5 mb-4 "
                    />
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className={styles.logsContainer}>
              <div className={styles.sugarLogs}> */}
            <BloodSugarTable />
            {/* </div>
              <div className={styles.pressureLogs}></div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vitals;
