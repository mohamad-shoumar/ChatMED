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

      