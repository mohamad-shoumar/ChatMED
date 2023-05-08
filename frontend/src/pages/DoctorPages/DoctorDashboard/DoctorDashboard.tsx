import React, { useState, useEffect, ReactNode } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SideNavBar from "../../../components/SideNavBar/SideNavBar";
import styles from "../../../styles/Doctor/Dashboard.module.scss";
import ".././../../Prime-theme/theme.css";
import { Card } from "@mui/material";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import docpic from "../../../assets/DocDash/docpic.png";
import { text } from "stream/consumers";
import PatientsTable from "../../../components/PatientsTable/PatientsTable";
import { API } from "../../../API/API";
import { useNavigate } from "react-router-dom";

import { base_url } from "../../../API/API";

interface Doctor {
  id: number;
  displayName: string;
  email: string;
  imageUrl: string;
}
interface Product {
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
  const [products, setProdcuts] = useState<Product[] | undefined>(undefined);
  const [consultations, setConsultations] = useState<
    Consultation[] | undefined
  >([]);

  const [chatResponse, setSelectedProduct] = useState<Product | null>(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const responseChat = await API.getAPI(`${base_url}response/`, token!);
        console.log("Response responseChat", responseChat);

        setConsultations(responseChat.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProfileeData = async () => {
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

    const fetchPatientData = async () => {
      try {
        const response = await API.getAPI(
          `${base_url}doctor/getpatients`,
          token!
        );
        console.log(response);
        setProdcuts(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResponses();
    fetchProfileeData();
    fetchPatientData();
  }, []);
  console.log("consultations", consultations);

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
        <div className={styles.bottom}>
          <PatientsTable consultations={consultations} patients={products} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
