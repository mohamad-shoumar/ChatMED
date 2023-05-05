import React, { useContext } from "react";
import styles from "../../styles/ChatPage/ChatPage.module.scss";
import Cam from "../../assets/Chats/cam.png";
import Add from "../../assets/Chats/add.png";
import More from "../../assets/Chats/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { data } = useContext<any>(ChatContext);
  return (
    <div className={styles.chat}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
        <div className={styles.chatIcons}>
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
