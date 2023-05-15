import React, { useState, useEffect, ReactNode } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import styles from "../../../styles/Doctor/Dashboard.module.scss";
import ".././../../Prime-theme/theme.css";
import { API } from "../../../API/API";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../API/API";
import PatientTable2 from "../../../components/PatientTable2/PatientTable2";

interface Doctor {
  id: number;
  displayName: any;
  email: string;
  imageUrl: string;
}
interface Patient {
  [x: string]: ReactNode;
  id: string;
  displayName: string;
  description?: string;
  imageUrl?: any;
  status?: any;
  role: any | undefined;
}
interface Consultation {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  diagnosis: string;
  treatmentPlan: string;
  symptoms: string;
  status: string;
}
const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [patients, setPatients] = useState<Patient[] | undefined>(undefined);
  const [consultations, setConsultations] = useState<
    Consultation[] | undefined
  >([]);
  const [chatResponse, setSelectedProduct] = useState<Consultation | null>(
    null
  );
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProfileeData = async () => {
      try {
        const response = await API.getAPI(
          `${base_url}doctor/getprofile`,
          token!
        );
        setDoctor(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileeData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className={styles.global}>
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
        <div className={styles.bottom}>
          <PatientTable2 />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
