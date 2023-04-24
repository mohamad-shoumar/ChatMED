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
const AllergySection = () => {
    
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




  return <div></div>;
};

export default AllergySection;
