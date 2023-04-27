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

interface allergyProps {
  onUpdateAllergies: (Allergies: { name: string; date: number }[]) => void;
}

const AllergiesSection = ({ onUpdateAllergies }: allergyProps) => {
  const [allergyName, setAllergyName] = useState("");
  const [date, setDate] = useState(0);
  const [allergies, setAllergies] = useState<{ name: string; date: number }[]>(
    []
  );
  const [showInputs, setShowInputs] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const handleAddAllergy = () => {
    const newAllergy = { name: allergyName, date: date };
    const updatedAllergy = [...allergies, newAllergy];
    setAllergies(updatedAllergy);
    onUpdateAllergies(updatedAllergy);
    setDate(0);
  };
  const handleDeleteAllergy = (index: any) => {
    const updatedAllergy = [...allergies];
    updatedAllergy.splice(index, 1);
    setAllergies(updatedAllergy);
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
        Did you have any Allergies?
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
                id="Allergy-label"
                fullWidth
                label="Allergy Name"
                variant="outlined"
                value={allergyName}
                onChange={(event) => setAllergyName(event.target.value)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Onset-Date"
                variant="outlined"
                value={date}
                onChange={(event) => setDate(parseInt(event.target.value))}
              />
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddAllergy}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
      {allergies.map((allergy, index) => (
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
            <Typography variant="body1">{allergy.name}</Typography>
          </Box>
          <Box sx={{ width: "40%" }}>
            <Typography variant="body1">{allergy.date}</Typography>
          </Box>
          <IconButton onClick={() => handleDeleteAllergy(index)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default AllergiesSection;
