import React from "react";
import { InputText } from "primereact/inputtext";

export default function Search() {
  const inputStyle = {
    borderRadius: "50px",
    height: "1rem",
  };
  return (
    <div
      className="card flex flex-wrap justify-content-center gap-3"
      style={{ borderRadius: "50%" }}
    >
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText style={inputStyle} height={10} placeholder="Search" />
      </span>
    </div>
  );
}
