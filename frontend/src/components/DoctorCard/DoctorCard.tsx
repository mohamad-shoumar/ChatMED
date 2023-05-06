import styles from "./DoctorCard.module.scss";
import doc from "../../assets/DocDash/doc.png";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import { base_url } from "../../API/API";
import { API } from "../../../src/API/API";
interface DoctorCardProps {
  isSelected: boolean;
  onClick: (id: number) => void;
  doctor: {
    id: number;
    displayName: string;
    imageUrl: string;
    price?: number;
    specialty?: string;
  };
}

interface Doctor {
  id: number;
  displayName: string;
  price?: number;
  specialty?: string;
  imageUrl: string;
}

function DoctorCard({ doctor, isSelected, onClick }: DoctorCardProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const toast = useRef<Toast>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const token = localStorage.getItem("token");

  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Doctor Selected",
    });
  };

  useEffect(() => {
    API.getAPI(`${base_url}patient/getdoctors`, token!).then((response) => {
      const doctors = response;
      setDoctors(doctors);
      console.log(response);
    });
  }, []);
  const handleCardClick = () => {
    onClick(doctor.id);
    setSelectedDoctorId(doctor.id);
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: `Doctor  Selected`,
    });
  };

  return (
    <div className={styles.doctorCard} onClick={handleCardClick}>
      <div>
        <Toast ref={toast} />
        <img className={styles.doctorImg} src={doc} alt={doctor.imageUrl} />
      </div>

      <div className={styles.doctorCardTop}>
        <div className={styles.docName}>{doctor.displayName}</div>
        <div>Price: {doctor.price}</div>
        <div>Speciality: {doctor.specialty}</div>
      </div>
    </div>
  );
}
export default DoctorCard;
