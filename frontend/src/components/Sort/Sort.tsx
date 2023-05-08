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
  user: any;
  specialization: any | undefined;
  _id: any;
  displayName?: any | null;
  price?: any;
  imageUrl: any;
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
        doctor.specialization === selectedCategory.name;
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
        value={selectedCategory}
        onChange={(e: DropdownChangeEvent) => handleSpecialtyChange(e.value)}
        options={category}
        style={{
          width: "17rem",

          borderRadius: "20px",
        }}
        optionLabel="name"
        placeholder="Select a specialty"
      />
    </div>
  );
}
