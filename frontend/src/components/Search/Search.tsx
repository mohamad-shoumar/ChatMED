import React, { ChangeEvent } from "react";
import { InputText } from "primereact/inputtext";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
  const inputStyle = {
    borderRadius: "50px",
    height: "1rem",
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
      className="card flex flex-wrap justify-content-center gap-3"
      style={{ borderRadius: "50%" }}
    >
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          style={inputStyle}
          height={10}
          placeholder="Search for doctors"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </span>
    </div>
  );
}
