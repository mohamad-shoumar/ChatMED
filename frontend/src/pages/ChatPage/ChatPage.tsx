import React from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "../../components/Chat/SideBar";
import styles from "../../styles/ChatPage/ChatPage.module.scss";
import Navbar from "../../components/NavBar/NavBar";

const Chats = () => {
  return (
    <div>
      <div className={styles.home}>
        <Navbar />
        <div className={styles.container}>
          <SideBar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Chats;
