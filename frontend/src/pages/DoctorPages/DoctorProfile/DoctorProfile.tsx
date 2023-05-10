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
import UpdateImage from "../../../components/UploadFile/UploadFile";
import emptyImage from "../../assets/emptyImage.png";
import { storage } from "../../../FireBaseChat";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef } from "react";

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
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Doctor Selected",
    });
  };
  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("token");
      const url = `${base_url}doctor/getprofile`;
      try {
        const res = await API.getAPI(url, token!);
        console.log("response", res);
        setName(res.displayName);
        setEmail(res.email);
        setProfilePicture(res.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  const handleClick = async () => {
    console.log("clicked");
    toast.current?.show({
      severity: "success",
      summary: "success",
      detail: `Profile Updated`,
    });
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
      } catch (error) {
        console.log(error);
      }
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className={styles.profile}>
        <div className={styles.head}>
          <Button
            style={{
              backgroundColor: "lightgrey",
              color: "#000000",
              borderRadius: "50px",
              border: "none",
            }}
            icon="pi pi-arrow-left"
            onClick={() => navigate("/docdashboard")}
            className="p-button-text"
          />
          <div style={{ fontWeight: "Bold", fontSize: "1.5rem" }}>
            Back to Dashboard
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.profilePic}>
              <input
                id="image-input"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              <label htmlFor="image-input" className={styles.images}>
                <img src={profilePicture} alt="" />
              </label>
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.email}>{email}</div>
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
              <Toast ref={toast} />

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
