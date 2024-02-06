import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./Student-Updateinternship.css";

function Student_Updateinternship() {
  //bg
  const [backgroundImage, setBackgroundImage] = useState("/bg/sec.png");
  const preloadImages = ["/bg/sec.png", "/bg/sit.png", "/bg/faculty.png"];
  useEffect(() => {
    preloadImages.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []); //effect preloading

  const handleImageChange = (newImage) => {
    setBackgroundImage(`/bg/${newImage}`);
  }; //function to change bg

  const [Mode, setMode] = React.useState("");
  const Checkbox = (event) => {
    setMode(event.target.value);
  };

  /*Business ID number*/
  const [selectedValue, setSelectedValue] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");
  const [isTextFieldEnabled, setIsTextFieldEnabled] = useState(false);

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    setIsTextFieldEnabled(true);
  };

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  /*academic year*/
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    `${currentYear}-${currentYear + 1}`
  );

  const yearOptions = Array.from({ length: 5 }, (_, index) => {
    const startYear = currentYear - index;
    return `${startYear}-${startYear + 1}`;
  });

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  /*update disable*/
  var statusState = "";

  const [isDisabled, setIsDisable] = useState(false);
  const [isCertDisabled, setCertDisable] = useState(false);

  const toggleDisable = () => {
    setIsDisable(!isDisabled);
  };

  const toggleCertDisable = () => {
    if (statusState == "pending") {
      setCertDisable(!isCertDisabled);
    }
  };

  const togglefun = () => {
    toggleDisable();
    toggleCertDisable();
  };
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
      }}
    >
      <Paper
        elevation={5}
        Component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "15ch" },
          width: "80%",
          margin: "auto",
        }}
      >
        <div>
          <h1 className="title1">Update Internship Details</h1>
          <h5 className="title2">Company details:</h5>
          <div id="company_det">
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Company name"
              placeholder="Enter your company name"
              type="text"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Company address"
              placeholder="Enter your company address"
              type="text"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Company phone number"
              placeholder="Enter company phone number"
              type="text"
              size="small"
            ></TextField>
            <FormControl
              disabled={isDisabled}
              id="busi_id_num"
              sx={{ m: 1, minWidth: 270 }}
              size="small"
            >
              <InputLabel>Business identification number</InputLabel>
              <Select value={selectedValue} onChange={handleDropdownChange}>
                <MenuItem value="option1">CIN number</MenuItem>
                <MenuItem value="option2">GST number</MenuItem>
                <MenuItem value="option3">UDYOG number</MenuItem>
              </Select>
            </FormControl>

            {isTextFieldEnabled && (
              <TextField
                disabled={isDisabled}
                style={{ width: "22%" }}
                label="Enter the number"
                value={textFieldValue}
                onChange={handleTextFieldChange}
                size="small"
              />
            )}
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Industry supervisor name"
              placeholder="Enter supervisor name"
              type="text"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Industry supervisor email"
              placeholder="Enter supervisor email"
              type="email"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Industry supervisor phone number"
              placeholder="Enter supervisor phone number"
              type="text"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Starting date"
              placeholder="Enter starting date"
              type="date"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Ending date"
              placeholder="Enter ending date"
              type="date"
              size="small"
            ></TextField>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Domain"
              placeholder="Enter your domain"
              type="text"
              size="small"
            ></TextField>
            <FormControl
              sx={{ m: 1, minWidth: 260 }}
              size="small"
              disabled={isDisabled}
            >
              <InputLabel id="demo-select-small-label">
                Mode of internship
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={Mode}
                label="Mode of internship"
                onChange={Checkbox}
              >
                <MenuItem value={10}>Offline</MenuItem>
                <MenuItem value={20}>Online</MenuItem>
                <MenuItem value={30}>Inplant</MenuItem>
              </Select>
            </FormControl>
            <TextField
              disabled={isDisabled}
              required
              style={{ width: "22%" }}
              label="Location"
              placeholder="Enter the location"
              type="text"
              size="small"
            ></TextField>
            <Button
              disabled={isDisabled}
              id="offerletter"
              required
              size="medium"
              style={{
                width: "22%",
                backgroundImage: `url(${backgroundImage})`,
              }}
              variant="contained"
              component="label"
            >
              Upload your offer letter
              <input type="file" hidden />
            </Button>
            <Button
              disabled={isCertDisabled}
              id="certificate"
              required
              size="medium"
              style={{
                width: "22%",
                backgroundImage: `url(${backgroundImage})`,
              }}
              variant="contained"
              component="label"
            >
              Upload certificate of completion
              <input type="file" hidden />
            </Button>
          </div>
          <h5>Academic details:</h5>
          <div id="academic_det">
            <FormControl
              sx={{ m: 1, minWidth: 290 }}
              size="small"
              disabled={isDisabled}
            >
              <InputLabel>Academic Year</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange}>
                {yearOptions.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              disabled={isDisabled}
              required
              style={{ width: "25%" }}
              label="Current CGPA"
              placeholder="Enter your current CGPA"
              type="text"
              size="small"
            ></TextField>
          </div>

          <div id="reg_button">
            <Button
              onClick={togglefun}
              variant="contained"
              size="medium"
              sx={{ height: 40, width: 660 }}
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Student_Updateinternship;
