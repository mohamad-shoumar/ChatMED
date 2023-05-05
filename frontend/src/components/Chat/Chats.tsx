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


export default Chats;
