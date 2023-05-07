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
import { InputTextarea } from "primereact/inputtextarea";

interface Doctor {
  _id: number;
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
  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await API.getAPI(
          `${base_url}patient/getdoctors`,
          token!
        );
        setDoctors(response);
        setFilteredDoctors(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctors();
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

  const handleSubmit = async (symptoms: string) => {
    console.log(symptoms);

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
      sticky: true,
    });

    hideDialog();
    const body: any = {
      doctor: selectedDoctorId,
      symptoms: symptoms,
    };
    const body2: any = {
      doctor: selectedDoctorId,
    };
    try {
      console.log(token);
      const response1 = await API.postAPI(`${base_url}response`, body, token!);
      console.log(response1);
      const response2 = await API.postAPI(
        `${base_url}patient/choosedoctor`,
        body2,
        token!
      );
      console.log(response2);
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
                      key={doctor._id}
                      doctor={{
                        _id: doctor._id,
                        displayName: doctor.displayName,
                        imageUrl: doctor.imageUrl,
                        price: 50,
                        specialty: doctor.specialty,
                      }}
                      onClick={handleDoctorCardClick}
                      isSelected={selectedDoctorId === doctor._id}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.botRight}>
                <div className={styles.symptoms}>
                  <h5> Past Consultations</h5>
                  <Button2 onClick={showDialog} label="New Consultation" />
                  <Dialog
                    header="MediDoc Here!"
                    visible={visible}
                    onHide={hideDialog}
                    style={{ width: "50%", height: "50%" }}
                    footer={
                      <div>
                        <Button2
                          label="Submit"
                          onClick={() => handleSubmit(symptoms)}
                        />
                        <Button
                          label="Cancel"
                          onClick={hideDialog}
                          style={{ color: "black" }}
                        />
                      </div>
                    }
                  >
                    <div className="p-fluid">
                      <div className="p-field">
                        <label
                          htmlFor="symptoms"
                          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                          Enter Your Symptoms
                        </label>
                        <input
                          id="symptoms"
                          type="text"
                          style={{ borderRadius: "5px" }}
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          className="p-input p-input-lg"
                        />
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
