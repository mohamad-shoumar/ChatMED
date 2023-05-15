import React, { useEffect, useState } from "react";
import styles from "../../styles/SideNavBar/SideNavBar.module.scss";
import Union from "../../assets/sidebar/Union.png";
import history from "../../assets/sidebar/history.png";
import vitals from "../../assets/sidebar/vitals.png";
import dash from "../../assets/sidebar/dash.png";
import chats from "../../assets/sidebar/chats.png";
import logs from "../../assets/sidebar/logs.png";
import sun from "../../assets/sidebar/sun.png";
import Icon from "../../assets/sidebar/Icon.png";
import doc from "../../assets/sidebar/doc.png";
import { useNavigate, useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBaseChat";
import { useTheme } from "@mui/material/styles";
// interface SideNavBarProps {
//   isDarkMode: boolean;
//   setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
// }
// ({
//   isDarkMode,
//   setIsDarkMode,
// })
// : React.FC<SideNavBarProps>
const SideNavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(-1);
  // const [isDarkMode, setIsDarkMode] = React.useState(false);
  const storedDarkTheme = localStorage.getItem("darkTheme");
  // const isDarkMode = storedDarkTheme ? JSON.parse(storedDarkTheme) : false;
  // useEffect(() => {
  //   const storedDarkTheme = localStorage.getItem("darkTheme");
  //   setIsDarkMode(storedDarkTheme ? JSON.parse(storedDarkTheme) : false);
  // }, []);
  // const toggleTheme = () => {
  //   const newDarkTheme = !isDarkMode;
  //   setIsDarkMode(newDarkTheme);
  //   localStorage.setItem("darkTheme", JSON.stringify(newDarkTheme));
  // };

  // console.log(isDarkMode);
  const togleTheme = () => {
    console.log("togleTheme");
  };

  const handleClick = (index: number) => {
    setActive(index);
  };
  const handleLogout = async () => {
    await localStorage.removeItem("token");
    await localStorage.clear();
    // const firebaseUser = firebase.auth().currentUser;
    // if (firebaseUser) {
    //   firebase.auth().signOut();
    // }
    navigate("/authentication");
    window.location.reload();
  };

  return (
    <div>
      <div className={styles.globalContainer}>
        <div className={styles.main}>
          <div className={styles.logo}>
            <img src={Union} alt="logo" />
          </div>
          <div className={styles.space}>
            <div className={styles.submain}>
              <div
                className={`${styles.link} ${
                  active === 0 ? styles.activeLink : ""
                } ${styles.hover}`}
                onClick={() => {
                  handleClick(0);
                  navigate("/dashboard");
                }}
              >
                <div className={styles.linkleft}>
                  <img src={dash} alt="logo" />
                  <div className={styles.word}>Dashboard</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>

              <div
                className={`${styles.link} ${
                  active === 1 ? styles.activeLink : ""
                } ${styles.hover}`}
                onClick={() => {
                  handleClick(1);
                  navigate("/medicalhistory");
                }}
              >
                <div className={styles.linkleft}>
                  <img src={history} alt="logo" />
                  <div className={styles.word}>Medical Hsitory</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>

              <div
                className={`${styles.link} ${
                  active === 2 ? styles.activeLink : ""
                } ${styles.hover}`}
                onClick={() => {
                  handleClick(2);
                  navigate("/vitals");
                }}
              >
                <div className={styles.linkleft}>
                  <img src={vitals} alt="logo" />
                  <div className={styles.word}> Vitals</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>
              <div
                className={`${styles.link} ${
                  active === 3 ? styles.activeLink : ""
                } ${styles.hover}`}
                onClick={() => {
                  handleClick(3);
                  navigate("/consultation");
                }}
              >
                <div className={styles.linkleft}>
                  <img src={doc} alt="logo" />
                  <div className={styles.word}> Consultations</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>
              <div
                className={`${styles.link} ${
                  active === 4 ? styles.activeLink : ""
                } ${styles.hover}`}
                onClick={() => {
                  handleClick(4);
                  navigate("/chat");
                }}
              >
                <div className={styles.linkleft}>
                  <img src={chats} alt="logo" />
                  <div className={styles.word}>Chats</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>
              {/* <div
                className={`${styles.link} ${styles.hover}`}
                onClick={() => navigate("/authentication")}
              >
                <div className={styles.linkleft}>
                  <img src={logs} alt="logo" />
                  <div className={styles.word} onClick={() => handleLogout()}>
                    Log Out
                  </div>
                </div>
                <img src={Icon} alt="arrow" />
              </div> */}
            </div>
            <div
              className={`${styles.darkmodeloc}`}
              onClick={() => navigate("/authentication")}
            >
              <div className={`${styles.darkmode} ${styles.hover}`}>
                <div className={styles.linkleft}>
                  <img src={logs} alt="logo" />
                  <div onClick={() => handleLogout()} className={styles.word}>
                    Log Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
