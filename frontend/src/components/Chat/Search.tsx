import styles from "../../styles/ChatPage/ChatPage.module.scss";
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../FireBaseChat";
import { AuthContext } from "../../context/AuthContext";
interface User {
  uid: string;
  displayName: string;
  photoURL: string;
}

  return (
    <div className={styles.search}>
      {" "}
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className={styles.userChat} onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className={styles.userChatInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
