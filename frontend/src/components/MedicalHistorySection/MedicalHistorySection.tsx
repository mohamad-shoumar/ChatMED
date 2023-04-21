import React, { useState } from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Card } from "primereact/card";

interface MedicalHistorySectionProps {
  sectionTitle: string;
  medicationNameLabel: string;
  frequencyLabel: string;
}
const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({
  sectionTitle,
  medicationNameLabel,
  frequencyLabel,
}) => {
  const [medicationName, setMedicationName] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleMedicationNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicationName(event.target.value);
  };

  const handleFrequencyChange = (event: DropdownChangeEvent) => {
    setFrequency(event.target.value);
  };

  const frequencyOptions = [
    { label: "Once a day", value: "once-a-day" },
    { label: "Twice a day", value: "twice-a-day" },
    { label: "Three times a day", value: "three-times-a-day" },
  ];

  return (
    <Card title={sectionTitle}>
      <div className="p-field">
        <label htmlFor="medicationName">{medicationNameLabel}</label>
        <InputText
          id="medicationName"
          value={medicationName}
          onChange={handleMedicationNameChange}
        />
      </div>
      <div className="p-field">
        <label htmlFor="frequency">{frequencyLabel}</label>
        <Dropdown
          id="frequency"
          value={frequency}
          options={frequencyOptions}
          onChange={handleFrequencyChange}
          placeholder="Select a frequency"
        />
      </div>
    </Card>
  );
};

MedicalHistorySection.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  medicationNameLabel: PropTypes.string.isRequired,
  frequencyLabel: PropTypes.string.isRequired,
};

export default MedicalHistorySection;
