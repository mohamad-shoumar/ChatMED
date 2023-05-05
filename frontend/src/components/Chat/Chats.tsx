import styles from "../../styles/ChatPage/ChatPage.module.scss";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../FireBaseChat";

interface ChatData {
  [key: string]: {
    userInfo: {
      uid: string;
      displayName: string;
      photoURL: string;
    };
    date: {
      seconds: number;
    };
    lastMessage?: {
      text: string;
      timestamp: {
        seconds: number;
      };
    };
  };
}

const Chats = (): JSX.Element => {
  const [chats, setChats] = useState<ChatData>({});

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() as ChatData);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u: {
    uid: string;
    displayName: string;
    photoURL: string;
  }) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className={styles.chats}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date.seconds - a[1].date.seconds)
        .map((chat) => (
          <div
            className={styles.userChat}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className={styles.userChatInfo}>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
