import React, { useEffect, useState } from "react";
import styles from "../../styles/Authentication/NavBar.module.scss";
import logoImage from "../../assets/navbar/logo1.png";
import bellIconImage from "../../assets/navbar/bell-fill.png";
import profileImage from "../../assets/navbar/person-circle.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import jwt_decode from "jwt-decode";
import jwt, { JwtPayload } from "jsonwebtoken";
import chatIconImage from "../../assets/navbar/chatIconImage.png";
import redbell from "../../assets/navbar/redbell.png";
import { API, base_url } from "../../API/API";

interface Notifications {
  data: string;
}

const Navbar = () => {
  const [user, setUser] = React.useState<JwtPayload | null>(null);
  const navigate = useNavigate();
  const { currentUser } = React.useContext(AuthContext);
  const [isBellActive, setIsBellActive] = useState(false);
  const [notifications, setNotifications] = useState("");
  const [bellImage, setBellImage] = useState(bellIconImage);
  const token = localStorage.getItem("token");

  const handleProfileClick = () => {
    let user: JwtPayload = jwt_decode(token!);
    setUser(user);
    if (user.role === "patient") {
      navigate("/patientprofile");
    } else if (user.role === "doctor") {
      navigate("/doctorprofile");
    }
  };
  useEffect(() => {
    const fetchAdviceData = async () => {
      try {
        console.log("hello ayman I love your attitude");
        const response = await API.getAPI(`${base_url}advice`, token!);

        console.log("advicedata", response.data);

        setNotifications(response.data);
        setBellImage(redbell);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAdviceData();
  }, []);

  const handleChatClick = () => {
    navigate("/chat");
    const token = localStorage.getItem("token");
    let user: JwtPayload = jwt_decode(token!);
    setUser(user);
    console.log(user);
  };

  console.log(user);
  console.log("notifications", notifications);

  const toggleBellImage = () => {
    if (isBellActive) {
      setBellImage(bellIconImage);
    } else {
      setBellImage(redbell);
    }
    setIsBellActive(!isBellActive);
  };

  return (
    <div className={styles.navmain}>
      <div className={styles.navright}>
        <img alt="logo" className={styles.logo} src={logoImage} />
        <h2 className={styles.ChatMED}>ChatMED</h2>
      </div>

      <div className={styles.navleft}>
        <div className={styles.noti}>
          <img onClick={handleChatClick} src={chatIconImage} alt="chat-icon" />
          <div style={{ fontSize: "0.8rem", color: "white" }}>Chats</div>
        </div>
        <div className={styles.noti}>
          <img
            className={isBellActive ? styles.bellActive : styles.bell}
            onClick={toggleBellImage}
            src={bellImage}
            alt="bell-icon"
          />
          {isBellActive && (
            <div className={styles.dropdown}>
              <div className={styles.notification}>
                <p>{notifications}</p>
              </div>
            </div>
          )}
          <div style={{ fontSize: "0.8rem", color: "white" }}>
            Notifications
          </div>
        </div>

        <div className={styles.noti}>
          <img
            onClick={handleProfileClick}
            src={profileImage}
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
