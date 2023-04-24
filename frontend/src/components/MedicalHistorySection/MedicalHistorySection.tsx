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
interface MedicalHistorySectionProps {
  onUpdateMedications: (
    medications: { name: string; frequency: string }[]
  ) => void;
}
const MedicalHistorySection = ({
  onUpdateMedications,
}: MedicalHistorySectionProps) => {
  const [medicationName, setMedicationName] = useState("");
  const [frequency, setFrequency] = useState("once");
  const [medications, setMedications] = useState<
    { name: string; frequency: string }[]
  >([]);
  const [showInputs, setShowInputs] = useState(false);
  const [activeButton, setActiveButton] = useState(false);

  const handleAddMedication = () => {
    const newMedication = { name: medicationName, frequency: frequency };
    const updatedMedications = [...medications, newMedication];
    setMedications(updatedMedications);
    onUpdateMedications(updatedMedications);
    setMedicationName("");
    setFrequency("once");
  };
  const handleDeleteMedication = (index: any) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 0,
        width: "90%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Are you currently taking any medication?
      </Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <IconButton
          sx={{
            "&:hover": {
              color: activeButton ? "red" : "initial",
            },
            "&:focus": {
              outline: activeButton ? "2px solid red" : "none",
              outlineOffset: 2,
              color: activeButton ? "red" : "initial",
            },
          }}
          onClick={() => {
            setShowInputs(false);
            setActiveButton(true);
          }}
        >
          <ClearIcon />
        </IconButton>
        <IconButton
          sx={{
            "&:hover": {
              color: activeButton ? "green" : "initial",
            },
            "&:focus": {
              outline: activeButton ? "2px solid green" : "none",
              outlineOffset: 2,
              color: activeButton ? "green" : "initial",
            },
          }}
          onClick={() => {
            setShowInputs(true);
            setActiveButton(true);
          }}
          onChange={() => {
            setActiveButton(true);
          }}
        >
          <CheckIcon />
        </IconButton>
      </Box>
      {showInputs && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Medication Name"
                variant="outlined"
                value={medicationName}
                onChange={(event) => setMedicationName(event.target.value)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="frequency-label">Frequency</InputLabel>
                <Select
                  labelId="frequency-label"
                  value={frequency}
                  onChange={(event) => setFrequency(event.target.value)}
                  label="Frequency"
                >
                  <MenuItem value="once">Once a day</MenuItem>
                  <MenuItem value="twice">Twice a day</MenuItem>
                  <MenuItem value="threeTimes">Three times a day</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMedication}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
      {medications.map((medication, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "8px",
          }}
        >
          <Box sx={{ width: "40%" }}>
            <Typography variant="body1">{medication.name}</Typography>
          </Box>
          <Box sx={{ width: "40%" }}>
            <Typography variant="body1">{medication.frequency}</Typography>
          </Box>
          <IconButton
            onClick={() => handleDeleteMedication(index)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default MedicalHistorySection;
