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

  );
};

export default LandingPage;
