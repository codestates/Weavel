import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Redirect } from "react-router";
import { PhotoBackground } from "./PhotoUpload.style";

const thumb = {
  display: "flex",
  alignItems: "center",
  width: 200,
  height: 200,
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

function EditUpload({
  fileInfo,
  editFileInfo,
  setFileHandle,
  photoIdx,
  allPhotoInfo,
  setFileEditHandle,
}) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(false);

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
      const newEditFileInfo = { ...editFileInfo };

      newEditFileInfo.newpath = files[0];
      newEditFileInfo.newfilename = files[0].name;

      setFileEditHandle(newEditFileInfo);
    }
  }, [files]);

  return (
    <div style={dropzone} {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <PhotoBackground>
        <aside>
          {files[0] === undefined ? (
            <>
              <div style={thumb} key={file.name}>
                <div style={thumbInner}>
                  <img
                    src={`http://localhost:4000/${allPhotoInfo[photoIdx].image}`}
                    style={img}
                  />
                </div>
              </div>
            </>
          ) : (
            <>{thumbs}</>
          )}
        </aside>
      </PhotoBackground>
    </div>
  );
}
export default EditUpload;
