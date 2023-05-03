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
import doc from "../../assets/sidebar/doc.png";
import { useNavigate, useLocation } from "react-router-dom";

const SideNavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(-1);
  const handleClick = (index: number) => {
    setActive(index);
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
                  navigate("/patient/dashboard");
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
                  navigate("/patient/medicalhistory");
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
                  navigate("/patient/vitals");
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
                  navigate("/patient/consultation");
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
                  navigate("/patient/chats");
                }}
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
            </div>
            <div className={`${styles.darkmodeloc}`}>
              <div className={`${styles.darkmode} ${styles.hover}`}>
                <div className={styles.linkleft}>
                  <img src={sun} alt="logo" />
                  <div className={styles.word}>Dark Mode</div>
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
