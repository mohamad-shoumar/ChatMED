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
  const [yesActive, setYesActive] = useState(false);
  const [noActive, setNoActive] = useState(false);
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
        // maxWidth: "600px",
        // "@media (max-width: 600px)": {
        //   fontSize: "14px",
        //   gap: "0.5rem",
        // },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          p: 0,
          width: "90%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you currently taking any medication?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant={yesActive ? "contained" : "outlined"}
            sx={{
              color: yesActive ? "white" : "initial",
              borderColor: "#244674",
              backgroundColor: yesActive ? "#244674" : "initial",
              "&:hover": {
                backgroundColor: yesActive ? "#244674" : "initial",
              },
            }}
            onClick={() => {
              setYesActive(!yesActive);
              setShowInputs(true);
              setNoActive(false);
            }}
          >
            Yes
          </Button>
          <Button
            variant={noActive ? "contained" : "outlined"}
            sx={{
              color: noActive ? "white" : "initial",
              borderColor: "#244674",
              backgroundColor: noActive ? "#244674" : "initial",
              "&:hover": {
                outlineOffset: 2,
                backgroundColor: noActive ? "#244674" : "initial",
              },
            }}
            onClick={() => {
              setShowInputs(false);
              setNoActive(!noActive);
              setYesActive(false);
            }}
          >
            No
          </Button>
        </Box>
      </Box>
      {showInputs && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                size="small"
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
                  size="small"
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
