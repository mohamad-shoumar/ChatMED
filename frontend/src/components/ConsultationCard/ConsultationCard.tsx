import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Scale } from "@mui/icons-material";

export default function ConsultationCard() {
  return (
    <div
      className="card flex flex-direction-column justify-content-center align-items-center"
      style={{
        background: "secondary",
        padding: "10px",
      }}
    >
      <div
        style={{
          background: "white",
          minWidth: "95%",
          padding: "10px",
          minHeight: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          flexGrow: 1,

          boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.75)",
        }}
      >
        <p style={{ fontSize: "14px", minHeight: "30px" }} className="m-0">
          Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet
          isquam? Dolores, totam assumenda. adipisicing elit. Inventore
        </p>
        <div style={{ fontSize: "10px" }}>28/4/2023</div>
      </div>
    </div>
  );
}
