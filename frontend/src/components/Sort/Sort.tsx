import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface SortBySpecialtyProps {
  onChange: (filterFn: (doctor: Doctor) => boolean) => void;
}
interface Category {
  name: string;
  code: string;
  icon: string;
}
interface Doctor {
  id: number;
  fullName: string;
  price: number;
  specialty: string;
  avatar: string;
}

export default function SortDoctor({ onChange }: SortBySpecialtyProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={setSelectedCategory}
        onChange={(e: DropdownChangeEvent) => handleSpecialtyChange(e.value)}
        options={category}
        style={{ transform: "scale(0.7)" }}
        optionLabel="name"
        placeholder="Select a specialty"
        className="w-full md:w-14rem"
      />
    </div>
  );
}
