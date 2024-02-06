import React, { useState, useEffect } from "react";
import "./Faculty-Facultydetailsupload.css";
import { Paper, Button } from "@mui/material";

function Faculty_Facultydetailsupload() {
  const [backgroundImage, setBackgroundImage] = useState("/bg/sec.png"); // state for background image, default picture is sec image

  const preloadImages = ["/bg/sec.png", "/bg/sit.png", "/bg/faculty.png"]; // preloading initializxation

  useEffect(() => {
    preloadImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []); // effect preloading

  const handleImageChange = (newImage) => {
    setBackgroundImage(`/bg/${newImage}`);
  }; // function to change bg
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        elevation={5}
        Component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "15ch" },
          width: "100%",
          margin: "auto",
          padding: "20px",
          maxWidth: "1000px",
          height: "100%",
        }}
      >
        <h1> Faculty Details Upload </h1>
        <p> Upload multiple faculty details:</p>
        <div id="facultyupload">
          <Button
            required
            component="label"
            variant="contained"
            size="small"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            Upload Faculty Details File
            <input type="file" hidden />
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default Faculty_Facultydetailsupload;
