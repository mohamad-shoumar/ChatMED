import styles from "./DoctorCard.module.scss";
import doc from "../../assets/DocDash/doc.png";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import { base_url } from "../../API/API";
import { API } from "../../../src/API/API";
interface DoctorCardProps {
  isSelected: boolean;
  onClick: (_id: number) => void;
  doctor: {
    _id: number;
    displayName: string;
    imageUrl: string;
    price?: number;
    specialty?: string;
  };
}

function DoctorCard({ doctor, isSelected, onClick }: DoctorCardProps) {
  const toast = useRef<Toast>(null);

  const handleCardClick = () => {
    onClick(doctor._id);
    isSelected = true;
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: `Doctor  Selected`,
    });
  };
  console.log(doctor._id);
  return (
    <div className={styles.doctorCard} onClick={handleCardClick}>
      <div>
        <Toast ref={toast} />
        <img
          className={styles.doctorImg}
          src={doctor.imageUrl}
          alt={doctor.imageUrl}
        />
      </div>

      <div className={styles.doctorCardTop}>
        <div className={styles.docName}>{doctor.displayName}</div>
        <div>Price: {doctor.price}$</div>
        <div>Speciality: {doctor.specialty}</div>
      </div>
    </div>
  );
}
export default DoctorCard;
