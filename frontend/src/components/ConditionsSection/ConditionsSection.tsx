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

l