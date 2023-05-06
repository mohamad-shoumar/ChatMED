import React from "react";
import styles from "./InforCard.module.scss";
interface InfoCardProps {
  Gender: string;
  Allergies: string;
  Diseases: any;
  Surgeries: any;
}
const InforCard: React.FC<InfoCardProps> = ({
  Gender,
  Allergies,
  Diseases,
  Surgeries,
}) => {
  return (
    <>
      <div className={styles.infocontainer}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Information</div>
        </div>
        <div className={styles.body}>
          <div className={styles.bodyinfo}>
            <span className={styles.bold}>Gender:</span> {Gender}
          </div>
          <div className={styles.bodyinfo}>
            <span className={styles.bold}>Surgeries:</span> {Surgeries}
          </div>
          <div className={styles.bodyinfo}>
            <span className={styles.bold}>Allergies:</span> {Allergies}
          </div>
          <div className={styles.bodyinfo}>
            <span className={styles.bold}>Diseases:</span> {Diseases}
          </div>
        </div>
      </div>
    </>
  );
};

export default InforCard;
