import styles from "../../styles/LandingPage/LandingPage.module.scss";
import logo1 from "../../assets/navbar/logo1.png";
import mini from "../../assets/LandingPage/mini.png";
import watch from "../../assets/LandingPage/watch.png";
import doc from "../../assets/LandingPage/doc.png";
import docon from "../../assets/LandingPage/docon.jpg";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import { useEffect } from "react";
// import i18next from "../../i18n";
import { t } from "i18next";

const LandingPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  // i18next.t("my.key");
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className={styles.main_container}>
        <div className={styles.navbar}>
          <div
            className={styles.main_logo}
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-duration="600"
          >
            <img id="logo" src={logo1} alt="" />
            <h5 className={styles.logo_head}>{t("ChatMED")}</h5>
          </div>

          <div className={styles.nav_buttons}>
            <button
              onClick={() => {
                navigate("/authentication");
              }}
              className={styles.but_main}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="300"
            >
              LOG IN
            </button>
            <button
              onClick={() => {
                navigate("/authentication");
              }}
              className={styles.but_main}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="300"
            >
              JOIN US <i></i>
            </button>
          </div>
        </div>
        <div className={styles.maincontenet}>
          <div className={styles.head_text}>
            <h1
              className={`${styles.headintext} headintext`}
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="400"
            >
              <b>Health</b> <br />
              <b className={styles.textAnimation}>{t("Powered by AI")}</b>
            </h1>
            <p className={`${styles.subheadintexxt} subheadintexxt `}>
              Transform your healthcare experience with our ChatGPT-powered
              medical app.
            </p>
          </div>
          <div className={styles.symptoms}>
            <img className={styles.heading_text} src={mini} alt="" />
            <br />
            <br />
            <br />
            <h4 className={styles.heading_in_syms}>
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
        <div
          className={styles.box_inmain}
          data-aos="fade-up-right"
          data-aos-delay="400"
          data-aos-duration="2000"
        >
          <p className={styles.para_inbox}>
            Get affordable and fast <br />
            responses using our <br />
            network of doctors and <br />
            Medibot, our chatbot <br />
            powered by chatgpt
          </p>
        </div>
        <div
          className={styles.box_inmain}
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="2000"
        >
          <p className={styles.para_inbox}>
            Get health advices <br />
            tailored to your medical <br />
            history
          </p>
        </div>
        <div
          className={styles.box_inmain}
          data-aos="fade-up-left"
          data-aos-delay="400"
          data-aos-duration="2000"
        >
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
        <img
          src={doc}
          alt=""
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="400"
        />
        <div className={styles.text_chat_MED}>
          <h1
            className={styles.head_chatmed}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="400"
          >
            Using ChatMED is as easy as <br />
            one,two,three
          </h1>
          <br />
          <h4
            className={styles.text_chatmed}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="400"
          >
            1. Enter your medical history <br /> <br />
            2. Select a doctor from our network and enter your symptoms into
            MediBot
            <br />
            <br />
            3. Receive a Response Validated by a Doctor
          </h4>
        </div>
      </div>
      <h2 className={styles.headerTitle3}> STAY CONNECTED</h2>
      <div className={styles.chat_MED2}>
        <div
          className={styles.text_chat_MED2}
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="400"
        >
          <h1 className={styles.head_chatmed}>
            Your Doctor, Just a Chat Away!
          </h1>
          <br />
          <h4
            className={styles.text_chatmed}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
          >
            Say goodbye to long waiting times and hello to personalized
            healthcare at your fingertips.
          </h4>
        </div>
        <img
          src={docon}
          alt=""
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="900"
        />
      </div>

      <div className={styles.footer}>
        <p className={styles.foot_text}>ChatMED all rights reserved 2023</p>
      </div>
    </div>
  );
};

export default LandingPage;
