import React, { useState, useEffect } from "react";
import emptyImage from "../../assets/emptyImage.png";
import { storage } from "../../FireBase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { v4 as uuidV4 } from "uuid";
import "./UploadFile.scss";
import axios from "axios";
import { base_url } from "../../API/API";
import { API } from "../../API/API";

interface UploadFileProps {
  className: string;
  disableChange?: boolean;
}

const UploadFile = ({ className, disableChange }: UploadFileProps) => {
  const [imageUrls, setImageUrls] = useState("");
  const [image, setImage] = useState(emptyImage);

  useEffect(() => {
    const token = localStorage.getItem("token") ?? undefined;
    const url = `${base_url}upload`;

    API.getAPI(url, token)
      .then((res) => {
        setImage(res.data.imageUrl || emptyImage);
        setImageUrls(res.data.imageUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFileSubmit = (e: any) => {
    if (e.target.files[0]) {
      const imageRef = ref(storage, `${uuidV4()}`);
      uploadBytes(imageRef, e.target.files[0]).then(() => {
        getDownloadURL(imageRef).then((url: string) => {
          setImageUrls(url);
          setImage(url);
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
    }
  };

  return (
    <>
      <label htmlFor="image-input">
        <img
          src={imageUrls || image}
          className={`pic ${className}`}
          alt="empty-pic"
        />
      </label>
      {!disableChange && (
        <input
          id="image-input"
          type="file"
          onChange={handleFileSubmit}
          style={{ display: "none" }}
        />
      )}
    </>
  );
};
export default UploadFile;
