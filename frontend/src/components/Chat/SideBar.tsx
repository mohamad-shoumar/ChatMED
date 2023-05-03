import React from "react";
import styles from "../../styles/ChatPage/ChatPage.module.scss";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
