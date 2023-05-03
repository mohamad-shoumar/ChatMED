import React from "react";
import Chat from "../../components/Chat/Chat";
import SideBar from "../../components/Chat/SideBar";

const Chats = () => {
  return (
    <div>
      <div className="home">
        <div className="container">
          <SideBar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Chats;
