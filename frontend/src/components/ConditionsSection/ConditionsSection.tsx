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

const ConditionSection = () => {
const ConditionsSection = ({ onUpdateConditions }: conditionProps) => {
const [conditionName, setConditionName] = useState("");
const [date, setDate] = useState(0);
const [conditions, setConditions] = useState<
{ name: string; date: number }[]
>([]);
const [showInputs, setShowInputs] = useState(false);
const [activeButton, setActiveButton] = useState(false);


l