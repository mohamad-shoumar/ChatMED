export {};

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
