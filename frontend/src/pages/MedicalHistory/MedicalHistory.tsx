import styles from "../../styles/MedicalHistory/MedicalHistory.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { useRadioGroup } from "@mui/material/RadioGroup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MedicalHistorySection from "../../components/MedicalHistorySection/MedicalHistorySection";
import SurgeriesSection from "../../components/SurgeriesSection/SurgeriesSection";
import AllergiesSection from "../../components/AllergySection/AllergySection";
import MedicalHistorySections from "../../components/MedicalHistorySections/MedicalHistorySections";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";

const MedicalHistory = () => {
  // useState variables
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [medications, setMedications] = useState<
    { name: string; frequency: string }[]
  >([]);
  const [surgeries, setSurgeries] = useState<{ name: string; date: number }[]>(
    []
  );
  const [allergies, setAllergies] = useState<{ name: string; date: number }[]>(
    []
  );
  const [chronicConditions, setChronicConditions] = useState<
    { name: string; date: number }[]
  >([]);

  const [gender, setGender] = useState("");
  const [medicalHistoryData, setMedicalHistoryData] = useState<any>({
    height: "",
    weight: "",
    dateOfBirth: "",
    medications: [],
    surgeries: [],
    allergies: [],
    chronicConditions: [],
    gender: "",
  });
  // handle height,wieght and date inputs
  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHeight(value);
    setMedicalHistoryData((prevData: any) => ({ ...prevData, height: value }));
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWeight(value);
    setMedicalHistoryData((prevData: any) => ({ ...prevData, weight: value }));
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().substring(0, 10);
      setMedicalHistoryData((prevData: any) => ({
        ...prevData,
        dateOfBirth: formattedDate,
      }));
    }
  };
  // handle gender radio buttons
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setGender(value);
    setMedicalHistoryData((prevData: any) => ({ ...prevData, gender: value }));
  };

  // handle Medicaions component
  const handleUpdateMedications = (
    medications: { name: string; frequency: string }[]
  ) => {
    setMedicalHistoryData({
      ...medicalHistoryData,
      medications: medications,
    });
  };
  // handle Surgeries component
  const handleUpdateSurgeries = (
    surgeries: { name: string; date: number }[]
  ) => {
    console.log("Surgeries updated:", surgeries);
    setMedicalHistoryData({ ...medicalHistoryData, surgeries: surgeries });
  };
  // handle Allergies component
  const handleUpdateAllergies = (
    allergies: { name: string; date: number }[]
  ) => {
    console.log("Allergies updated:", allergies);
    setMedicalHistoryData({ ...medicalHistoryData, allergies: allergies });
  };
  // handle Chronic Conditions component
  const handleUpdateChronicConditions = (
    chronicConditions: { name: string; date: number }[]
  ) => {
    console.log("Chronic conditions updated:", chronicConditions);
    setMedicalHistoryData({
      ...medicalHistoryData,
      chronicConditions: chronicConditions,
    });
  };
  console.log(medicalHistoryData);

  // Handle submit button
  const handleMedicalHistorySubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = { ...medicalHistoryData };
    const body = JSON.stringify({ medicalHistory: data });
    console.log(body);
    console.log("Token:", token);

    const response = await API.postAPI(
      `${base_url}medicalhistory/addhistory`,
      body,
      token!
    );
    console.log("Response:", response);
    console.log("Medical history data:", medicalHistoryData);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.medicalHistory}>
        <SideNavBar />
        <div className={styles.medicalHistoryContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.medicalHistoryTitle}>
              <h2>Medical History</h2>
            </div>
            <div className={styles.submitbtn}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleMedicalHistorySubmit}
              >
                <Typography variant="button">Sumbit</Typography>
              </Button>
            </div>
          </div>
          <div className={styles.medicalHistoryForm}>
            <div className={styles.height}>
              <TextField
                id="height"
                label="Height"
                variant="outlined"
                type="number"
                value={height}
                onChange={handleHeightChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {unitSystem === "metric" ? "cm" : "in"}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={styles.weight}>
              <TextField
                id="weight"
                label="Weight"
                variant="outlined"
                type="number"
                value={weight}
                onChange={handleWeightChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {unitSystem === "metric" ? "kg" : "lb"}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={styles.datePicker}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleDateChange} />
              </LocalizationProvider>
            </div>
          </div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={gender}
              onChange={handleGenderChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <div className={styles.sectionsMain}>
            <div className={styles.sections}>
              <div className={styles.section1}>
                <SurgeriesSection onUpdateSurgeries={handleUpdateSurgeries} />
              </div>
              <div className={styles.section1}>
                <MedicalHistorySection
                  onUpdateMedications={handleUpdateMedications}
                />
              </div>
              <div className={styles.section1}>
                <AllergiesSection onUpdateAllergies={handleUpdateAllergies} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
