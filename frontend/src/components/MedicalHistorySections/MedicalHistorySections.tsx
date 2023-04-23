import React from "react";
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
interface MedicalHistorySections {
  title: string;
  data: any;
  setData: any;
}

const MedicalHistorySections = ({
  title,
  data,
  setData,
}: MedicalHistorySections) => {
  return <div>MedicalHistorySections</div>;
};

export default MedicalHistorySections;
