import styles from "./DoctorCard.module.scss";
import doc from "../../assets/DocDash/doc.png";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
interface DoctorCardProps {
  isSelected: boolean;
  onClick: (id: number) => void;
  doctor: {
    id: number;
    fullName: string;
    avatar: string;
    price: number;
    specialty: string;
  };
}

function DoctorCard({ doctor, isSelected, onClick }: DoctorCardProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Doctor Selected",
    });
  };
  const handleCardClick = () => {
    onClick(doctor.id);
    setSelectedDoctorId(doctor.id);
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: `Doctor  Selected`,
    });
  };
  console.log(doctor.id);
  return (
    <div className={styles.doctorCard} onClick={handleCardClick}>
      <div>
        <Toast ref={toast} />
        <img className={styles.doctorImg} src={doc} alt={doctor.fullName} />
      </div>

      <div className={styles.doctorCardTop}>
        <div className={styles.docName}>{doctor.fullName}</div>
        <div>Price: {doctor.price}</div>
        <div>Speciality: {doctor.specialty}</div>
      </div>
    </div>
  );
}
export default DoctorCard;
