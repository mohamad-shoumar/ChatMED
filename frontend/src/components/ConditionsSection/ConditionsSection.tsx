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
  const [yesActive, setYesActive] = useState(false);
  const [noActive, setNoActive] = useState(false);
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
          Did you have any Chronic Conditions?
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
                id="Condition-label"
                size="small"
                fullWidth
                label="Condition Name"
                variant="outlined"
                value={conditionName}
                onChange={(event) => setConditionName(event.target.value)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                size="small"
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
      {conditions.map((condition, index) => (
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
            <Typography variant="body1">{condition.name}</Typography>
          </Box>
          <Box sx={{ width: "40%" }}>
            <Typography variant="body1">{condition.date}</Typography>
          </Box>
          <IconButton onClick={() => handleDeleteCondition(index)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default ConditionsSection;
