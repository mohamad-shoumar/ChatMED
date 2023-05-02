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
import { useState } from "react";
import { ClassNames } from "@emotion/react";
import { classNames } from "primereact/utils";

const SideNavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState("Dashboard");

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
                className={`${styles.link} ${styles.hover}`}
                onClick={() => navigate("/patient/dashboard")}
              >
                <div className={styles.linkleft}>
                  <img src={dash} alt="logo" />
                  <div className={styles.word}>Dashboard</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>

              <div
                className={`${styles.link} ${styles.hover}`}
                onClick={() => navigate("/patient/medicalhistory")}
              >
                <div className={styles.linkleft}>
                  <img src={history} alt="logo" />
                  <div className={styles.word}>Medical Hsitory</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>

              <div
                className={`${styles.link} ${styles.hover}`}
                onClick={() => navigate("/patient/vitals")}
              >
                <div className={styles.linkleft}>
                  <img src={vitals} alt="logo" />
                  <div className={styles.word}> Vitals</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>
              <div
                className={`${styles.link} ${styles.hover}`}
                onClick={() => navigate("/patient/consultation")}
              >
                <div className={styles.linkleft}>
                  <img src={doc} alt="logo" />
                  <div className={styles.word}> Consultations</div>
                </div>
                <img src={Icon} alt="arrow" />
              </div>
              <div
                className={`${styles.link} ${styles.hover}`}
                onClick={() => navigate("/chat")}
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

// const SideNavBar = () => {
//   const navigate = useNavigate();
//   const [active, setActive] = useState("Dashboard");

//   const handleLinkClick = (link: string) => {
//     setActive(link);
//     navigate(`/patient/${link.toLowerCase()}`);
//   };

//   return (
//     <div>
//       <div className={styles.globalContainer}>
//         <div className={styles.main}>
//           <div className={styles.logo}>
//             <img src={Union} alt="logo" />
//           </div>
//           <div className={styles.space}>
//             <div className={styles.submain}>
//               <div
//                 className={classNames(styles.link, styles.hover, {
//                   [styles.active]: active === "Dashboard",
//                 })}
//                 onClick={() => handleLinkClick("Dashboard")}
//               >
//                 <div className={styles.linkleft}>
//                   <img src={dash} alt="logo" />
//                   <div className={styles.word}>Dashboard</div>
//                 </div>
//                 <img src={Icon} alt="arrow" />
//               </div>

//               <div
//                 className={classNames(styles.link, styles.hover, {
//                   [styles.active]: active === "Medicalhistory",
//                 })}
//                 onClick={() => handleLinkClick("Medicalhistory")}
//               >
//                 <div className={styles.linkleft}>
//                   <img src={history} alt="logo" />
//                   <div className={styles.word}>Medical History</div>
//                 </div>
//                 <img src={Icon} alt="arrow" />
//               </div>

//               <div
//                 className={classNames(styles.link, styles.hover, {
//                   [styles.active]: active === "Vitals",
//                 })}
//                 onClick={() => handleLinkClick("Vitals")}
//               >
//                 <div className={styles.linkleft}>
//                   <img src={vitals} alt="logo" />
//                   <div className={styles.word}>Vitals</div>
//                 </div>
//                 <img src={Icon} alt="arrow" />
//               </div>
//               <div
//                 className={classNames(styles.link, styles.hover, {
//                   [styles.active]: active === "Consultation",
//                 })}
//                 onClick={() => handleLinkClick("Consultation")}
//               >
//                 <div className={styles.linkleft}>
//                   <img src={doc} alt="logo" />
//                   <div className={styles.word}>Consultations</div>
//                 </div>
//                 <img src={Icon} alt="arrow" />
//               </div>
//               <div
//                 className={classNames(styles.link, styles.hover, {
//                   [styles.active]: active === "Chats",
//                 })}
//                 onClick={() => handleLinkClick("Chats")}
//               >
//                 <div className={styles.linkleft}>
//                   <img src={chats} alt="logo" />
//                   <div className={styles.word}>Chats</div>
//                 </div>
//                 <img src={Icon} alt="arrow" />
//               </div>
//               <div
//                 className={classNames(styles.link, styles.hover)}
//                 onClick={() => navigate("")}
//               >
//                 <div className={styles.linkleft}>
//                   <img src={logs} alt="logo" />
//                   <div className={styles.word}>Log Out</div>
//                 </div>
//                 <img src={Icon} alt="arrow" />
//               </div>
//             </div>
//             <div className={`${styles.darkmodeloc}`}>
//               <div className={`${styles.darkmode} ${styles.hover}`}>
//                 <div className={styles.linkleft}>
//                   <img src={sun} alt="logo" />
//                   <div className={styles.word}>Dark Mode</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideNavBar;
