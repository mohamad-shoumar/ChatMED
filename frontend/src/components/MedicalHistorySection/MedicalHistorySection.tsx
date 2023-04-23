import styles from "../.././styles/MedicalHistory/MedicalHistorySection.module.scss";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

const MedicalHistorySection = () => {
  const [medicationName, setMedicationName] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [medications, setMedications] = useState<
    { name: string; frequency: string }[]
  >([]);
  const [showInputs, setShowInputs] = useState(false);

  const handleAddMedication = () => {
    const newMedication = { name: medicationName, frequency: frequency };
    setMedications([...medications, newMedication]);
    setMedicationName("");
    setFrequency("once");
  };

  const handleDeleteMedication = (index: any) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  return (

};

export default MedicalHistorySection;
