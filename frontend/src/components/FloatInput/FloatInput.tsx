import React, { useState, ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";

interface Props {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FloatLabelDemo: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div className="card flex justify-content-center" style={{ width: "100%" }}>
      <span
        className="p-float-label"
        style={{
          width: "100%",
          margin: "0 15px 0 15px",
          // backgroundColor: "#e0e0e0",
          boxShadow: "0 0 0 0",
        }}
      >
        <InputText
          className="p-inputtext-sm"
          style={{ width: "100%" }}
          id={label}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={label}>{label}</label>
      </span>
    </div>
  );
};

export default FloatLabelDemo;
