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
  const category: Category[] = [
    { name: "Cardiology", code: "NY", icon: "pi pi-heart" },
    { name: "Virology", code: "RM", icon: "pi pi-virus" },
    { name: "Neurology", code: "LDN", icon: "pi pi-brain" },
    { name: "Chronic-Pain", code: "IST", icon: "pi pi-thermometer" },
  ];
  const handleSpecialtyChange = (selectedCategory: Category | null) => {
    if (selectedCategory) {
      const filterFn = (doctor: Doctor) =>
        doctor.specialty === selectedCategory.name;
      onChange(filterFn);
    } else {
      onChange(() => true);
    }
    setSelectedCategory(selectedCategory);
  };
  const categoryTemplate = (option: Category) => {
    return (
      <div className="p-grid p-nogutter p-align-center">
        <div className="p-col">
          <i className={option.icon} />
        </div>
        <div className="p-col">{option.name}</div>
      </div>
    );
  };

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
