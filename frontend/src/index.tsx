import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initReactI18next } from "react-i18next";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
const theme = createTheme({
  palette: {
    primary: {
      main: "#244674",
      contrastText: "#fff",
    },
    secondary: {
      main: "#01b8e2",
      contrastText: "#fff",
    },
    background: {
      default: "#ecf4f6",
    },
    text: {
      primary: "#121c38",
      secondary: "#a0acb7",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 11,
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 0.8,
      color: "#244674",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 0.8,
      color: "#121c38",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.5rem",
      lineHeight: 0.8,
      color: "#121c38",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.25rem",
      lineHeight: 0.8,
      color: "#121c38",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 0.8,
      color: "#121c38",
    },
  },
});

// i18n.use();
const Root = () => {
  // const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  // const toggleTheme = () => {
  //   setIsDarkTheme((prevTheme) => !prevTheme);
  // };
  // const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </ChatContextProvider>
    </AuthContextProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
// ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <AuthContextProvider>
//     <ChatContextProvider>
//       <React.StrictMode>
//         <ThemeProvider theme={theme}>
//           <App />
//         </ThemeProvider>
//       </React.StrictMode>
//     </ChatContextProvider>
//   </AuthContextProvider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
