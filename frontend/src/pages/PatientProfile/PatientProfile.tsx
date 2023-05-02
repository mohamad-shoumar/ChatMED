import styles from "../../styles/Profile/Profile.module.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import TextField from "@mui/material/TextField";
import { useState, useContext, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { API } from "../../API/API";
import { base_url } from "../../API/API";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 as uuidV4 } from "uuid";
import { storage } from "../../FireBase";
import axios from "axios";

declare global {
  interface File {
    objectURL: string;
  }
}

const PatientProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState("");

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileSubmit = () => {
    if (!image) {
      console.log("No image selected");
      return;
    }
    const imageRef = ref(storage, `${uuidV4()}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url: string) => {
        setImageUrls(url);

        console.log(url);
        axios
          .post(
            `${base_url}upload`,
            { imageUrl: url },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };

  return (
    <div>
      <NavBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          justifyContent: "space-between",
          height: "90vh",
          marginTop: "10vh",
        }}
      >
        <SideNavBar />
        <Box
          sx={{
            width: "78%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "50px 15px",
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
              onClick={handleFileSubmit}
            >
              Edit
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              width: "70%",
              height: "70%",
              marginLeft: "8vw",
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
        </Box>
      </Box>
    </div>
  );
};

export default PatientProfile;
