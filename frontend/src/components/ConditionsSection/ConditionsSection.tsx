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

interface conditionProps {
onUpdateConditions: (conditions: { name: string; date: number }[]) => void;
}


const ConditionsSection = ({ onUpdateConditions }: conditionProps) => {
const [conditionName, setConditionName] = useState("");
const [date, setDate] = useState(0);
const [conditions, setConditions] = useState<
{ name: string; date: number }[]
>([]);
const [showInputs, setShowInputs] = useState(false);
const [activeButton, setActiveButton] = useState(false);
const handleAddCondition = () => {
    const newCondition = { name: conditionName, date: date };
    const updatedConditions = [...conditions, newCondition];
    setConditions(updatedConditions);
    onUpdateConditions(updatedConditions);
    setDate(0);
    };
    const handleDeleteCondition = (index: any) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
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
        Did you have any Conditions?
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
            <InputLabel id="Condition-label">Condition</InputLabel>
            <TextField
              id="Condition-label"
              fullWidth
              label="Condition Name"
              variant="outlined"
              value={conditionName}
              onChange={(event) => setConditionName(event.target.value)}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
              <InputLabel id="date-label">Onset-Date</InputLabel>
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
              onClick={handleAddCondition}
            >
              Add
            </Button>
          </Box>
        </Box>
      )}
      