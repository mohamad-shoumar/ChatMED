import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBaseChat";
import { AuthContext } from "../../context/AuthContext";
import style from "../../styles/ChatPage/ChatPage.module.scss";

const Navbar: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={style.navbar}>
      <span className={style.logo}>Lama Chat</span>
      <div className={style.user}>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
