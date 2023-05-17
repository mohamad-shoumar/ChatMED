import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
// import { Message as MessageType } from "../types";
import styles from "../../styles/ChatPage/ChatPage.module.scss";

type Props = {
  message: any;
};

const Message: React.FC<Props> = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${styles.message} ${
        message.senderId === currentUser?.uid ? styles.owner : ""
      }`}
    >
      <div className={styles.messageInfo}>
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : data?.user?.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
