import React from "react";
import styles from "../../styles/SideNavBar/SideNavBar.module.scss";
import Union from "../../assets/sidebar/Union.png";
import history from "../../assets/sidebar/history.png";
import vitals from "../../assets/sidebar/vitals.png";
import dash from "../../assets/sidebar/dash.png";
import chats from "../../assets/sidebar/chats.png";
import logs from "../../assets/sidebar/logs.png";
import sun from "../../assets/sidebar/sun.png";
import Icon from "../../assets/sidebar/Icon.png";
import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.logo}>
          <img src={Union} alt="logo" />
        </div>
        <div className={styles.submain}>
          <div className={styles.dash}>
            <img src={dash} alt="logo" />
            <div className={styles.Dashboard}>Dashboard</div>
          </div>
          <div
            className={`${styles.link} ${styles.hover}`}
            onClick={() => navigate("/medicalhistory")}
          >
            <div className={styles.linkleft}>
              <img src={history} alt="logo" />
              <div className={styles.word}>Medical Hsitory</div>
            </div>
            <img src={Icon} alt="arrow" />
          </div>
          <div
            className={`${styles.link} ${styles.hover}`}
            onClick={() => navigate("/authentication")}
          >
            <div className={styles.linkleft}>
              <img src={vitals} alt="logo" />
              <div className={styles.word}> Vitals</div>
            </div>
            <img src={Icon} alt="arrow" />
          </div>
          <div
            className={`${styles.link} ${styles.hover}`}
            onClick={() => navigate("")}
          >
            <div className={styles.linkleft}>
              <img src={chats} alt="logo" />
              <div className={styles.word}>Chats</div>
            </div>
            <img src={Icon} alt="arrow" />
          </div>
          <div
            className={`${styles.link} ${styles.hover}`}
            onClick={() => navigate("")}
          >
            <div className={styles.linkleft}>
              <img src={logs} alt="logo" />
              <div className={styles.word}>Log Out</div>
            </div>
            <img src={Icon} alt="arrow" />
          </div>
          <div className={`${styles.darkmode} ${styles.hover}`}>
            <div className={styles.linkleft}>
              <img src={sun} alt="logo" />
              <div className={styles.word}>Dark Mode</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;