import React from "react";
import styles from "../../styles/Authentication/NavBar.module.scss";
import logoImage from "../../assets/navbar/logo1.png";
import bellIconImage from "../../assets/navbar/bell-fill.png";
import profileImage from "../../assets/navbar/person-circle.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = React.useContext(AuthContext);
  const handleProfileClick = () => {
    const role = currentUser?.role;

    if (role === "patient") {
      navigate("/patientprofile");
    } else if (role === "doctor") {
      navigate("/doctorprofile");
    }
  };
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
          <div style={{ fontSize: "0.8rem", color: "white" }}>
            Notifications
          </div>
        </div>
        <div className={styles.noti}>
          <img
            onClick={handleProfileClick}
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
          />
          <div style={{ fontSize: "0.7rem", color: "white" }}>
            {currentUser?.displayName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
