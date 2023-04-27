import styles from "../../styles/Profile/Profile.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";

const PatientProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("email", email);
      formData.append("profilePicture", file);

      console.log("API Data:", formData);
      console.log(file);

      const response = await API.postAPI(
        `${base_url}patient/editProfile`,
        formData,
        token!
      );
      const imageUrl = response.data.pictureUrl;
      console.log("Response:", response);

      setName("");
      setEmail("");
      console.log(formData);
      console.log("Response:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <Container
        fixed
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "80vh",
          marginTop: "15vh",
        }}
      >
        <SideNavBar />
        <Container
          sx={{
            marginLeft: "20vw",
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
              alignItems: "center",
              marginTop: "40px",
              width: "85%",
              height: "80%",
              margin: "auto",
              border: "1px solid #000",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                width: "35%",
                height: "100%",
                padding: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: (theme) => theme.palette.primary.main,
              }}
            >
              <img
                src="https://picsum.photos/200"
                alt="profile"
 
          </Box>
        </Container>
      </Container>
    </div>
  );
};

export default PatientProfile;
