import React from "react";
import styles from "../.././styles/MedicalHistory/MedicalHistorySection.module.scss";
import { useState, useEffect } from "react";
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
  Container,
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
  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const [showInputs, setShowInputs] = useState(false);
  const [activeButton, setActiveButton] = useState(false);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Typography variant="h4" color="initial">
            {title}
          </Typography>
        </Box>
        <Box>
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
        </Box>
      </Box>
    </Container>
  );
};

export default MedicalHistorySections;
