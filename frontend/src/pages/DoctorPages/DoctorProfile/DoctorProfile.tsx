import React, { useState, useEffect } from "react";
import PrimeReact from "primereact/api";
import styles from "../../../styles/Doctor/Profile.module.scss";
import NavBar from "../../../components/NavBar/NavBar";
import docpic from "../../../assets/DocDash/docpic.png";
import FloatLabelDemo from "../../../components/FloatInput/FloatInput";
import { Button } from "primereact/button";
import UploadFile from "../../../components/UploadFile/UploadFile";
import { API } from "../../../API/API";
import { base_url } from "../../../API/API";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DoctorProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [price, setPrice] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [doctor, setDoctor] = useState<any>(undefined);
  const token = localStorage.getItem("token");
  const { currentUser } = useContext(AuthContext);

  const handleClick = async () => {
    console.log("clicked");

    try {
      const body = {
        displayName: name,
        workingHours: workingHours,
        price: price,
        specialization: specialization,
        profilePictureUrl: profilePicture,
      };
      const response = await API.postAPI(
        `${base_url}doctor/editprofile`,
        body,
        token!
      );
      console.log(response);
      setDoctor(response);

      if (currentUser) {
        await currentUser.updateProfile({
          displayName: name,
          photoURL: profilePicture,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.profile}>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.profilePic}>
              <UploadFile
                className="my-class"
                disableChange={false}
                imageUrl={profilePicture}
              />
            </div>
            <div className={styles.name}>Dr. John Doe</div>
            <div className={styles.email}>Dr.JohnDoe22@gmail.com</div>
          </div>
          <div className={styles.right}>
            <div className={styles.header}>
              <h3>Edit Profile</h3>
              <div className={styles.headerButtons}>
                <Button
                  label="Edit"
                  size="small"
                  style={{ height: "2rem" }}
                  onClick={handleClick}
                />
              </div>
            </div>

            <div className={styles.editFields}>
              <FloatLabelDemo
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />

              <FloatLabelDemo
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                label="Working Hours"
              />

              <FloatLabelDemo
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                label="Price"
              />

              <FloatLabelDemo
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                label="Specialization"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
