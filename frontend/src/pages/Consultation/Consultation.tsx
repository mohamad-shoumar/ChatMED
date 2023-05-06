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
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import Button2 from "../../components/Button2/Button2";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ConsultationCard from "../../components/ConsultationCard/ConsultationCard";
import Sort from "../../components/Sort/Sort";
interface Doctor {
  id: number;
  displayName: string;
  price?: number;
  specialty?: string;
  imageUrl: string;
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
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
  };
  const token = localStorage.getItem("token");
  const [consultation, setConsultation] = useState<any>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  useEffect(() => {
    API.getAPI(`${base_url}patient/getdoctors`, token!).then((response) => {
      const doctors = response;
      setDoctors(doctors);
      setFilteredDoctors(doctors);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    API.getAPI(`${base_url}patient/getconsultation`, token!).then(
      (response) => {
        const consultation = response;
        setConsultation(consultation);
        console.log(response);
      }
    );
  }, []);

  const handleSpecialtyChange = (filterFn: (doctor: Doctor) => boolean) => {
    const filtered = doctors.filter(filterFn);
    setFilteredDoctors(filtered);
  };
  const handleDoctorCardClick = (doctorId: number) => {
    setSelectedDoctorId(doctorId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDoctorId) {
      toast.current?.show({
        severity: "error",
        summary: "error",
        detail: `Please Choose a doctor`,
      });
      return;
    }
    toast.current?.show({
      severity: "info",
      summary: "info",
      detail: `Pending, waiting for doctor's response`,
    });
    const body: any = {
      doctorId: selectedDoctorId,
      response: "hello",
    };
    try {
      API.postAPI(`${base_url}response`, token!, body).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
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
                <Sort onChange={handleSpecialtyChange} />
                <div className={styles.docCards}>
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={{
                        id: doctor.id,
                        displayName: doctor.displayName,
                        imageUrl: doctor.imageUrl,
                        price: 50,
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
                  <Button2 onClick={showDialog} label="New Consultation" />
                  <Dialog
                    header="Enter Symptoms"
                    visible={visible}
                    onHide={hideDialog}
                    footer={
                      <div>
                        <Button2 label="Submit" onClick={handleSubmit} />
                      </div>
                    }
                  >
                    <div className="p-fluid">
                      <div className="p-field">
                        <label htmlFor="symptoms">Symptoms</label>
                        <input id="symptoms" type="text" />
                      </div>
                    </div>
                  </Dialog>
                </div>

                <div className={styles.response}>
                  <ConsultationCard />
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
