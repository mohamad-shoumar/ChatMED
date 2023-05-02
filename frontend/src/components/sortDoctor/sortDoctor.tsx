import React, { ChangeEvent } from "react";

interface SortBySpecialtyProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SortDoctor({ onChange }: SortBySpecialtyProps) {
  return (
    <div className="sort-by-specialty">
      <label htmlFor="specialty-select">Sort by specialty:</label>
      <select id="specialty-select" onChange={onChange}>
        <option value="all">All</option>
        <option value="cardiology">Cardiology</option>
        <option value="dermatology">Dermatology</option>
        <option value="neurology">Neurology</option>
        <option value="pediatrics">Pediatrics</option>
      </select>
    </div>
  );
}
export default SortDoctor;
