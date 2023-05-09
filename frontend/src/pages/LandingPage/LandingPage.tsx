import styles from "../../styles/LandingPage/LandingPage.module.scss";
import logo1 from "../../assets/navbar/logo1.png";
import mini from "../../assets/LandingPage/mini.png";
import watch from "../../assets/LandingPage/watch.png";
import doc from "../../assets/LandingPage/doc.png";

// // scroll effect
// import { useState, useEffect } from "react";
// import "./styles.css";

// function MyComponent() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const element = document.querySelector(".my-element");
//       if (window.scrollY > element.offsetTop - window.innerHeight / 2) {
//         setIsVisible(true);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className={`my-element ${isVisible ? "fade-in" : ""}`}>
//       <p>This is my content.</p>
//       <p>It will fade in when the user scrolls to it.</p>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.navbar}>
          <div className={styles.main_logo}>
            <img id="logo" src={logo1} alt="" />
            <h5 className={styles.logo_head}>ChatMED</h5>
          </div>

          <div className={styles.nav_buttons}>
            <button
              onClick={() => {
                navigate("/authentication");
              }}
              className={styles.but_main}
            >
              LOG IN
            </button>
            <button
              onClick={() => {
                navigate("/authentication");
              }}
              className={styles.but_main}
            >
              JOIN US <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className={styles.maincontenet}>
          <div className={styles.head_text}>
            <h1 className={styles.headintext}>
              Health <br />
              Powered by AI
            </h1>
            <p className={styles.subheadintexxt}>
              Transform your healthcare experience with our ChatGPT-powered
              medical app.
            </p>
          </div>
          <div className={styles.symptoms}>
            <img className={styles.heading_text} src={mini} alt="" />
            <br />
            <br />
            <br />
            <h4 className={styles.heading_symptoms}>
              Let’s start with the symptom that’s troubling <br />
              you the most.
            </h4>
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.headerTitle}>WHY CHATMED</h2>
      </div>
      <div className={styles.main_box}>
        <div className={styles.box_inmain}>
          <p className={styles.para_inbox}>
            Get affordable and fast <br />
            responses using our <br />
            network of doctors and <br />
            Medibot, our chatbot <br />
            powered by chatgpt
          </p>
        </div>
        <div className={styles.box_inmain}>
          <p className={styles.para_inbox}>
            Get health advices <br />
            tailored to your medical <br />
            history
          </p>
        </div>
        <div className={styles.box_inmain}>
          <p className={styles.para_inbox}>
            Track Your Health and <br />
            Receive daily motivation <br />
            or warning through push <br />
            notifications based on <br />
            your vitals
          </p>
        </div>
      </div>
      <h2 className={styles.headerTitle}>HOW TO USE</h2>

      <div className={styles.chat_MED}>
        <img src={doc} alt="" />
        <div className={styles.text_chat_MED}>
          <h1 className={styles.head_chatmed}>
            Using Chat-MED is as easy as <br />
            one,two,three
          </h1>
          <br />
          <h4 className={styles.text_chatmed}>
            1.Enter your medical history <br /> <br />
            2.Select a doctor from our network and enter your symptoms into
            MediBot
            <br />
            <br />
            3.Receive a Response Validated by a Doctor
          </h4>
        </div>
      </div>
      <h2 className={styles.headerTitle3}> STAY CONNECTED</h2>
      <div className={styles.chat_MED2}>
        <div className={styles.text_chat_MED2}>
          <h1 className={styles.head_chatmed}>
            Compatible with smart wearables
          </h1>
          <br />
          <h4 className={styles.text_chatmed}>
            Connect your smart wearables to keep a better track of your health,
            and get more accurate data.
          </h4>
        </div>
        <img src={watch} alt="" />
      </div>

      <div className={styles.footer}>
        <p className={styles.foot_text}>ChatMED all rights reserved 2023</p>
      </div>
    </div>
  );
};

export default LandingPage;
