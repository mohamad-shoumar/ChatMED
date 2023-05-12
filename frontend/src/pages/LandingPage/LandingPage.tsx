import styles from "../../styles/LandingPage/LandingPage.module.scss";
import logo1 from "../../assets/navbar/logo1.png";
import mini from "../../assets/LandingPage/mini.png";
import doc from "../../assets/LandingPage/doc.png";
import docon from "../../assets/LandingPage/docon.jpg";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import "../../styles/LandingPage/flags.css";
import Translation from "../../Data.json";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { log } from "console";
interface Language {
  name: string;
  code: string;
}
const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);
  const [language, setLanguage] = useState("English");
  const [content, setContent] = useState<any>({});
  const languages: Language[] = [
    { name: "English", code: "US" },
    { name: "Japanese", code: "JP" },
    { name: "Swedish", code: "SE" },
  ];

  useEffect(() => {
    if (language == "English") {
      setContent(Translation.English);
    } else if (language == "Swedish") {
      setContent(Translation.Swedish);
    } else if (language == "Japanese") {
      setContent(Translation.japanese);
    }
  });

  const selectedLanguageTemplate = (option: Language, props: any) => {
    if (option) {
      return (
        <div className="flex align-items-center">
          <img
            alt={option.name}
            src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
            className={`mr-2 flag flag-${option.code.toLowerCase()}`}
            style={{ width: "18px" }}
          />
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const languageOptionTemplate = (option: Language) => {
    return (
      <div className="flex align-items-center">
        <img
          alt={option.name}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`mr-2 flag flag-${option.code.toLowerCase()}`}
          style={{ width: "18px" }}
        />
        <div>{option.name}</div>
      </div>
    );
  };
  console.log(content);

  console.log(language);

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
            <h5 className={styles.logo_head}>ChatMED</h5>
          </div>

          <div className={styles.nav_buttons}>
            <div>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={language}
                  onChange={(e: DropdownChangeEvent) =>
                    setLanguage(e.value.name)
                  }
                  style={{
                    color: "#244674",
                    border: "none",
                    height: "2.2rem",
                    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    textAlign: "center",
                    margin: "0 auto",
                    fontSize: "17px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    marginRight: "0.6rem",
                  }}
                  options={languages}
                  optionLabel="name"
                  placeholder="Select a Language"
                  valueTemplate={selectedLanguageTemplate}
                  itemTemplate={languageOptionTemplate}
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/authentication");
              }}
              className={styles.but_main}
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="300"
            >
              {content.nav1}
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
              {content.nav2} <i></i>
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
              <b>{content.Title1}</b> <br />
              <b className={styles.textAnimation}>{content.Title2}</b>
            </h1>
            <p className={`${styles.subheadintexxt} subheadintexxt `}>
              {content.Description}
            </p>
          </div>
          <div className={styles.symptoms}>
            <img className={styles.heading_text} src={mini} alt="" />
            <br />
            <br />
            <br />
            <h4 className={styles.heading_in_syms}>{content.subTitle}</h4>
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.headerTitle}>{content.why}</h2>
      </div>
      <div className={styles.main_box}>
        <div
          className={styles.box_inmain}
          data-aos="fade-up-right"
          data-aos-delay="400"
          data-aos-duration="2000"
        >
          <p className={styles.para_inbox}>{content.affordable}</p>
        </div>
        <div
          className={styles.box_inmain}
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="2000"
        >
          <p className={styles.para_inbox}>{content.tailored}</p>
        </div>
        <div
          className={styles.box_inmain}
          data-aos="fade-up-left"
          data-aos-delay="400"
          data-aos-duration="2000"
        >
          <p className={styles.para_inbox}>{content.track}</p>
        </div>
      </div>
      <h2 className={styles.headerTitle}>{content.how}</h2>

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
            {content.easy}
          </h1>
          <br />
          <h4
            className={styles.text_chatmed}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="400"
          >
            {content.step1}
            <br />
            <br />
            {content.step2}
            <br />
            <br />
            {content.step3}
          </h4>
        </div>
      </div>

      <h2 className={styles.headerTitle3}>{content.stay}</h2>
      <div className={styles.chat_MED2}>
        <div
          className={styles.text_chat_MED2}
          data-aos="fade-down"
          data-aos-delay="400"
          data-aos-duration="1500"
        >
          <h1 className={styles.head_chatmed}>{content.doctor}</h1>
          <br />
          <h4
            className={styles.text_chatmed}
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1300"
          >
            {content.goodbye}
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
        <p className={styles.foot_text}>{content.footer}</p>
      </div>
    </div>
  );
};

export default LandingPage;
