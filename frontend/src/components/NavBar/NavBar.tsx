import React from "react";
import styles from "../../styles/Authentication/NavBar.module.scss";
import logoImage from "../../assets/navbar/logo1.png";
import bellIconImage from "../../assets/navbar/bell-fill.png";
import profileImage from "../../assets/navbar/person-circle.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navmain}>
      <div className={styles.navright}>
        <img alt="logo" className={styles.logo} src={logoImage} />
        <h2 className={styles.ChatMED}>ChatMED</h2>
      </div>
      <div className={styles.navleft}>
        <div className={styles.noti}>
          <img
            className={styles.bell}
            onClick={() => navigate("/notifications")}
            src={bellIconImage}
            alt="bell-icon"
          />
          <div style={{ fontSize: "1rem", color: "white" }}>Notifications</div>
        </div>
        <div className={styles.noti}>
          <img
            onClick={(e) => {
              navigate("/patient/profile");
            }}
            src={profileImage}
            alt="profile"
          />
          <div style={{ fontSize: "1rem", color: "white" }}>Profile</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
