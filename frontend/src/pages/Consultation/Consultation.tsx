import React, { useRef } from "react";
import styles from "../../styles/Consultation/Consultation.module.scss";
import { useState, useEffect } from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import NavBar from "../../components/NavBar/NavBar";
import "../../Prime-theme/theme.css";
import { base_url } from "../../API/API";
import { API } from "../../../src/API/API";
import Search from "../../components/Search/Search";
import SortDoctor from "../../components/sortDoctor/sortDoctor";
import { Button, Dialog } from "@mui/material";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import Button2 from "../../components/Button2/Button2";
import { Card } from "primereact/card";

import { Toast } from "primereact/toast";

import ConsultationCard from "../../components/ConsultationCard/ConsultationCard";
interface Doctor {
  id: number;
  fullName: string;
  price: number;
  specialty: string;
}
const Consultation = () => {
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Doctor Selected",
    });
  };
  const token = localStorage.getItem("token");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  useEffect(() => {
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
  const handleDoctorCardClick = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
  };
  const filteredDoctors =
    specialtyFilter === "all"
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === specialtyFilter);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDoctorId) {
      alert("Please select a doctor.");
      return;
    }
    const body: any = {
      doctorId: selectedDoctorId,
      response: "hello",
    };
    API.postAPI(`${base_url}advice/`, token!, body).then((response) => {
      console.log(response);
    });
  };

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
                <h5>Choose a Doctor</h5>
                <Toast ref={toast} />
                <SortDoctor onChange={handleSpecialtyChange} />
                <div className={styles.docCards}>
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={{
                        id: doctor.id,
                        fullName: doctor.fullName,
                        avatar: "",
                        price: doctor.price,
                        specialty: doctor.specialty,
                      }}
                      onClick={() => handleDoctorCardClick(doctor.id)}
                      isSelected={selectedDoctorId === doctor.id}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.botRight}>
                <div className={styles.symptoms}>
                  <h5> Past Consultations</h5>
                  <Button2 />
                </div>
                <div className={styles.response}>
                  <ConsultationCard />
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
