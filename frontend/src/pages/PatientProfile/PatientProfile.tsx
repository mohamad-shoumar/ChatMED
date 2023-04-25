import styles from "../../styles/MedicalHistory/MedicalHistory.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";

const PatientProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  return (
    <div>
      <NavBar />
      <Container
        fixed
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "15vh",
        }}
      >
        <SideNavBar />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0 15px",
            }}
          >
            <Typography variant="h3" color="text">
              Edit Profile
            </Typography>
            <Button
              sx={{
                borderRadius: "0px",
                size: "meduim",
              }}
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Edit
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "50%",
              height: "70%",
              margin: "auto",
              gap: 3,
              border: "3px solid #000",
            }}
          >
            <img
              src="https://picsum.photos/200"
              alt="profile"
              style={{ borderRadius: "50%" }}
            />
            <input type="file" name="pic" accept="image/*" />
            <TextField id="name" label="Name" variant="outlined" />
            <TextField id="email" label="Email" variant="outlined" />
            <TextField
              id="dateOfBirth"
              label="Date of Birth"
              variant="outlined"
            />
          </Box>
        </Container>
      </Container>
    </div>
  );
};

export default PatientProfile;
