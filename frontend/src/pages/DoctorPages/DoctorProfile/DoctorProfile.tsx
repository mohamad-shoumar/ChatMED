import React, { useState, useEffect } from "react";
import PrimeReact from "primereact/api";
import styles from "../../../styles/Doctor/Profile.module.scss";
import NavBar from "../../../components/NavBar/NavBar";
import docpic from "../../../assets/DocDash/docpic.png";
import FloatLabelDemo from "../../../components/FloatInput/FloatInput";
import { Button } from "primereact/button";
import UploadFile from "../../../components/UploadFile/UploadFile";

const DoctorProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [price, setPrice] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  return (
    <>
      <NavBar />
      <div className={styles.profile}>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.profilePic}>
              <UploadFile className="my-class" disableChange={false} />
            </div>
            <div className={styles.name}>Dr. John Doe</div>
            <div className={styles.email}>Dr.JohnDoe22@gmail.com</div>
          </div>
        
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
