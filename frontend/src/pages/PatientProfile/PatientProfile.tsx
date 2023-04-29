import styles from "../../styles/Profile/Profile.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { API } from "../../../src/API/API";
import { base_url } from "../../API/API";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../FireBase";
declare global {
  interface File {
    objectURL: string;
  }
}

const PatientProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState<File>();
  const imagesListRef = ref(storage, "images/");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUrls(e.target.files[0]);
    }
  };

  // const uploadFile = () => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `images/${imageUpload.name}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //     });
  //   });
  // };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (imageUrls == null) return;
      const token = localStorage.getItem("token");
      // const formData = new FormData();
      // formData.append("fullName", name);
      // formData.append("email", email);
      // formData.append("link", imageUrls);
      const data = { name, email, imageUrls };
      const body = JSON.stringify({ patientProfile: data });
      // console.log("API Data:", formData.getAll("fullName"));

      const response = await API.postAPI(
        `${base_url}patient/editProfile`,
        body,
        token!
      );
      console.log("Response:", response);

      setName("");
      setEmail("");
      // console.log(formData);
      console.log("Response:", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <NavBar /> */}
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
                style={{
                  borderRadius: "50%",
                  width: "80%",
                  height: "40%",
                  border: "3px solid text",
                }}
              />
              <br />
              <Button color="secondary" variant="contained" component="label">
                Upload
                <input
                  onChange={handleFileChange}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
            </Box>
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                justifyContent: "space-evenly",
                gap: "8px",
                marginLeft: "15px",
                width: "55%",
              }}
            >
              {" "}
              <InputLabel id="Allergy-label">Full Name</InputLabel>
              <TextField
                size="small"
                id="name"
                placeholder="name"
                variant="filled"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel id="date-label">Email</InputLabel>
              <TextField
                size="small"
                id="email"
                placeholder="email"
                variant="filled"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputLabel id="date-label">Date of Birth</InputLabel>
              <TextField
                size="small"
                id="dateOfBirth"
                placeholder="DOB"
                variant="filled"
                fullWidth
              />
            </Box>
          </Box>
        </Container>
      </Container>
    </div>
  );
};

export default PatientProfile;
