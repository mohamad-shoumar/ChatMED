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
          width: "90%",
          padding: "10px",
          minHeight: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <p style={{ fontSize: "14px", minHeight: "60px" }} className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          esse, cupiditate neque quas! Lorem ipsum dolor, sit amet consectetur
          i, nostrum animi?
        </p>
        <div style={{ fontSize: "10px" }}>28/4/2023</div>
      </div>
    </div>
  );
}
