import styles from "../../styles/MedicalHistory/MedicalHistory.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Toast } from "primereact/toast";

import { FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";

import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MedicalHistorySection from "../../components/MedicalHistorySection/MedicalHistorySection";
import SurgeriesSection from "../../components/SurgeriesSection/SurgeriesSection";
import AllergiesSection from "../../components/AllergySection/AllergySection";
import ConditionsSection from "../../components/ConditionsSection/ConditionsSection";
import MedicalHistorySections from "../../components/MedicalHistorySections/MedicalHistorySections";

import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";
import Button2 from "../../components/Button2/Button2";

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
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "warn",
      summary: "warn",
      detail: "Error Occured!",
    });
  };

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
    try {
      const token = localStorage.getItem("token") ?? undefined;
      const data = { ...medicalHistoryData };
      const body = { medicalHistory: data };
      console.log(body);
      console.log("Token:", token);

      const response = await API.postAPI(
        `${base_url}medicalhistory/addhistory`,
        body,
        token
      );
      console.log("Response:", response);
      console.log("Medical history data:", medicalHistoryData);
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: `Medical-History added.`,
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.log("error");
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: `Error adding medical history.`,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className={styles.medicalHistory}>
        <SideNavBar />
        <div className={styles.medicalHistoryContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.medicalHistoryTitle}>
              <h2>Medical History</h2>
            </div>
            <div className={styles.submitbtn}>
              <Button2 onClick={handleMedicalHistorySubmit} />
            </div>
          </div>
          <div className={styles.medicalHistoryForm}>
            <div className={styles.height}>
              <TextField
                size="small"
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
                size="small"
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
                <DatePicker
                  slotProps={{ textField: { size: "small" } }}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </div>
          </div>

          <FormControl
            size="small"
            sx={{ marginLeft: "25px", marginTop: "30px" }}
          >
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
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
              <div className={styles.section1}>
                <ConditionsSection
                  onUpdateConditions={handleUpdateChronicConditions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
