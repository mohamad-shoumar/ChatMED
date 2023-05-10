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
const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue("--primay-color");

interface Doctor {
  user: any;
  specialization: any | undefined;
  _id: any;
  displayName?: any | null;
  price?: any;
  imageUrl: any;
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
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
      const response1 = await API.postAPI(`${base_url}response`, body, token!);

      const response2 = await API.postAPI(
        `${base_url}patient/choosedoctor`,
        body2,
        token!
      );
      console.log("response", response1);
      console.log("response2", response2);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <SideNavBar />
        <div className={styles.rightSection}>
          <div className={styles.headerContainer}>
            <div className={styles.medicalHistoryTitle}>
              <h2>Consultations</h2>
            </div>
            <div className={styles.submitbtn}>
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <div className={styles.medicalHistoryForm}>
            <div className={styles.bot}>
              <div className={styles.botLeft}>
                <h5>Choose a Doctor</h5>
                <Toast ref={toast} />
                <Sort onChange={handleSpecialtyChange} />
                <div className={styles.docCards}>
                  {filteredDoctors
                    .filter(
                      (doctor) =>
                        doctor.user?.displayName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        doctor.specialization
                          ?.toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )

                    .map((doctor) => (
                      <DoctorCard
                        key={doctor._id}
                        doctor={{
                          _id: doctor.user._id,
                          displayName: doctor.user?.displayName,
                          imageUrl: doctor.user?.imageUrl,
                          price: doctor.price,
                          specialty: doctor.specialization,
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
                    style={{
                      width: "fit-content",
                      maxWidth: "90%",
                      height: "fit-content",
                    }}
                    footer={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <Button2
                          label="Submit"
                          onClick={() => handleSubmit(symptoms)}
                        />
                        <Button2 label="Cancel" onClick={hideDialog} />
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
                          style={{
                            borderRadius: "5px",
                            width: "100%",
                            height: "4rem",
                          }}
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
