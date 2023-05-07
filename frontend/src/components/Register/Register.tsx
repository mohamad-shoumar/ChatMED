import React from "react";
import { API } from "../../API/API";
import { base_url } from "../../API/API";
import style from "../../styles/Authentication/Register.module.scss";
import styles from "../../styles/Authentication/Authentication.module.scss";
import { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Add from "../../assets/Chats/add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../FireBaseChat";
import { Toast } from "primereact/toast";
import { v4 as uuidV4 } from "uuid";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState("");
  const nav = useNavigate();
  const url = `${base_url}auth/register`;
  const toast = useRef<Toast>(null);
  const show = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Doctor Selected",
    });
  };
  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  console.log(file);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErr(false);
    let data2 = {
      displayName: displayName,
      role: role,
      imageUrl: "",
      file: file,
      email: email,
      password: password,
    };
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${uuidV4()}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          data2.imageUrl = downloadURL;
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              role: role,
              email,
              photoURL: downloadURL,
            });

            // create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            console.log(data2);

            // save user in db
            const response = await API.postAPI(url, data2);
            console.log(response);

            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: `Registered succesfully, please Sign in.`,
              sticky: true,
            });
            setDisplayName("");
            setEmail("");
            setPassword("");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
            toast.current?.show({
              severity: "warn",
              summary: "Warn",
              detail: `Error signing up.`,
            });
          }
        });
      });
    } catch (err: any) {
      console.log(err);
      console.log(err.message);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div
      className={styles["form-container"] + " " + styles["sign-up-container"]}
    >
      <form>
        <h1 className={styles.title2}>Create New Account</h1>
        <span className={styles.span}>Already have an account? sign in </span>

        <input
          type="text"
          placeholder="Full Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <div>
          <div className={style["gender-label"]}>Role:</div>

          <div className={style["btn-options"]}>
            <label>
              <input
                type="radio"
                name="role"
                value="patient"
                onChange={(e) => setRole("patient")}
                className={style.input}
              />
              Patient
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                onChange={(e) => setRole("doctor")}
                className={style.input}
              />
              Doctor
            </label>
          </div>
        </div>
        <input
          required
          style={{ display: "none" }}
          type="file"
          accept="*/*"
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <img src={Add} alt="" />
          <span>Add a Picture</span>
        </label>
        <button
          className={`${styles["btn-signin"]} ${styles["ghost-signup"]} ${styles["gradient-button"]} ${styles["gradient-button-1"]}`}
          id="sup"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <Toast ref={toast} />
        {loading && "Uploading and compressing the image please wait..."}
      </form>
    </div>
  );
};

export default Register;
