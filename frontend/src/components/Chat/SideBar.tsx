import React from "react";
import styles from "../../styles/ChatPage/ChatPage.module.scss";
import Search from "./Search";
import Chats from "./Chats";
import NavBar from "./NavBar";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <NavBar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
