import styles from "./DoctorCard.module.scss";
interface DoctorCardProps {
  doctor: {
    name: string;
    avatar: string;
    price: number;
    specialty: string;
  };
}

function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className={styles.doctorCard}>
      <img src={doctor.avatar} alt={doctor.name} />
      <h3>{doctor.name}</h3>
      <p>Price: {doctor.price}</p>
      <p>Specialty: {doctor.specialty}</p>
    </div>
  );
}
export default DoctorCard;
