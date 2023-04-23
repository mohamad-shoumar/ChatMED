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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          What medication are you currently taking?
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setShowInputs(false)}>
          <ClearIcon className={styles.x} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={() => setShowInputs(true)}>
          <CheckIcon className={styles.correct} />
        </IconButton>
      </Grid>
      {showInputs && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Medication Name"
              variant="outlined"
              value={medicationName}
              onChange={(event) => setMedicationName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMedication}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      )}
      {medications.map((medication, index) => (
        <Grid key={index} container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body1">{medication.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">{medication.frequency}</Typography>
          </Grid>
          <Box ml="auto">
            <IconButton
              onClick={() => handleDeleteMedication(index)}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
};

export default MedicalHistorySection;
