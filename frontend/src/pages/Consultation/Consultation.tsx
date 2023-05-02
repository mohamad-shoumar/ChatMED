import React from "react";
import styles from "../../styles/Consultation/Consultation.module.scss";
import { useState, useEffect } from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import NavBar from "../../components/NavBar/NavBar";
import "../../Prime-theme/theme.css";
import { base_url } from "../../API/API";
import { API } from "../../../src/API/API";
import Search from "../../components/Search/Search";
import SortDoctor from "../../components/sortDoctor/sortDoctor";
import { Dialog } from "@mui/material";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
interface Doctor {
  id: number;
  name: string;
  price: number;
  specialty: string;
}
const Consultation = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getAPI(`${base_url}patient/getdoctors`, token!).then((response) => {
      setDoctors(response);
      console.log(response);
    });
  }, []);
  const handleSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSpecialtyFilter(event.target.value);
  };
  const filteredDoctors =
    specialtyFilter === "all"
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === specialtyFilter);
  return (
    <div>
      <NavBar />
      <div className={styles.mainContainer}>
        <SideNavBar />
        <div className={styles.rightSection}>
          <div className={styles.headerContainer}>
            <div className={styles.medicalHistoryTitle}>
              <h2>Consultations</h2>
            </div>
            <div className={styles.submitbtn}>
              <Search />
            </div>
          </div>
          <div className={styles.medicalHistoryForm}>
            <div className={styles.bot}>
              <div className={styles.botLeft}>
                <SortDoctor onChange={handleSpecialtyChange} />
                <div className={styles.docCards}>
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={{
                        name: "",
                        avatar: "",
                        price: 0,
                        specialty: "",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.botRight}>
                <div className={styles.symptoms}>
                  <h3>Symptoms</h3>
                </div>
                <div className={styles.response}>
                  <Dialog open={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
