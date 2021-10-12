import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Redirect } from "react-router";
import { PhotoBackground } from "./PhotoUpload.style";

const thumbsContainer = {
  display: "flex",
};

const thumb = {
  display: "flex",
  alignItems: "center",
  width: 200,
  height: 200,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  maxWidth: 200,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: 200,
  height: 200,
  objectFit: "cover",
};

const dropzone = {
  width: 0,
  height: 0,
  position: "relative",
};

function Previews({ token, loginUserInfo }) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    userId: loginUserInfo.id,
    image: null,
    filename: null,
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFile(true);
    if (files[0]) {
      fileInfo.image = files[0];
      fileInfo.filename = files[0].name;
      setFileInfo(fileInfo);
      handlePhotoUpload();
    }
  }, [files]);

  const formData = new FormData();
  formData.append("userId", loginUserInfo.id);
  formData.append("image", fileInfo.image);
  formData.append("filename", fileInfo.filename);

  const handlePhotoUpload = () => {
    axios
      .post(
        "http://localhost:4000/photo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(`signin error: ${err.message}`);
      });
  };

  return (
    <div style={dropzone} {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <PhotoBackground>
        {!file ? (
          <>
            <img src="./images/upload.svg"></img>
            <div>
              <b>Drag&Drop</b>도 가능합니다
            </div>
          </>
        ) : (
          <aside style={thumbsContainer}>{thumbs}</aside>
        )}
      </PhotoBackground>
    </div>
  );
}
export default Previews;
