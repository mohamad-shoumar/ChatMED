import styles from "./DoctorCard.module.scss";
interface DoctorCardProps {
  doctor: {
    fullName: string;
    avatar: string;
    price: number;
    specialty: string;
  };
}

function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className={styles.doctorCard}>
      {/* <img src={doctor.avatar} alt={doctor.fullName} />
      <p>{doctor.fullName}</p>
      <p>Price: {doctor.price}</p>
      <p>Specialty: {doctor.specialty}</p> */}
    </div>
  );
}
export default DoctorCard;
