import React, { useState, useEffect } from "react";
import {
  Paper,
  Button,
  TextField,
  Stack,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./Student-Registration.css";

function Student_Registration() {
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

  /*map mentorname and email*/
  const [selectedStaff, setSelectedStaff] = useState("");
  const [staffEmail, setStaffEmail] = useState("");

  const handleStaffChange = (event) => {
    const selectedName = event.target.value;
    setSelectedStaff(selectedName);

    const staff = staffData.find((staff) => staff.name === selectedName);
    if (staff) {
      setStaffEmail(staff.email);
    } else {
      setStaffEmail("");
    }
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
          height: "50%",
          margin: "auto",
        }}
      >
        <div>
          <h1 className="title1">Registration</h1>
          <h5 className="title2">Student details:</h5>
          <div id="student_det_class">
            <TextField
              required
              style={{ width: "20%" }}
              label="Student name"
              placeholder="Enter your full name"
              type="text"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="College name"
              placeholder="Enter your college name"
              type="text"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="Student ID"
              placeholder="Enter your ID"
              type="text"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="Register number"
              placeholder="Enter your register number"
              type="text"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="Year of studying"
              placeholder="Enter your year of studying"
              type="text"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="Department"
              placeholder="Enter your department"
              type="text"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="Student email"
              placeholder="Enter your email"
              type="email"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "20%" }}
              label="Phone number"
              placeholder="Enter phone number"
              type="text"
              size="small"
            ></TextField>
            <Button
              id="picbutton"
              required
              size="small"
              style={{
                width: "20%",
                backgroundImage: `url(${backgroundImage})`,
              }}
              variant="contained"
              component="label"
            >
              Upload your profile photo
              <input type="file" hidden />
            </Button>
            <Stack spacing={3} sx={{ width: 500 }}>
              <Autocomplete
                multiple
                id="skillselect"
                options={skillsets}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    variant="outlined"
                    style={{ width: "57%" }}
                    label="Skills"
                    placeholder="Enter your skills"
                    type="text"
                    size="small"
                  ></TextField>
                )}
              />
            </Stack>
          </div>

          <h5>Mentor details:</h5>
          <div id="mentor_details">
            <div
              id="mentorname_email"
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "93%",
                rowGap: "10px",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingLeft: "10px",
              }}
            >
              <FormControl sx={{ minWidth: 285 }}>
                <InputLabel id="staff_label" required>
                  Select Mentor Name
                </InputLabel>
                <Select
                  labelId="staff_label"
                  style={{ width: "100%" }}
                  id="staff_select"
                  size="small"
                  value={selectedStaff}
                  onChange={handleStaffChange}
                >
                  {staffData.map((staff) => (
                    <MenuItem key={staff.name} value={staff.name}>
                      {staff.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                style={{ width: "600%" }}
                label="Mentor email"
                placeholder="Mentor email"
                size="small"
                value={staffEmail}
                disabled
                sx={{ minWidth: 290 }}
              />
            </div>
          </div>

          <h5>Password details:</h5>
          <div id="pass_det">
            <TextField
              required
              style={{ width: "25%" }}
              label="Set password"
              placeholder="Enter your password"
              type="password"
              size="small"
            ></TextField>
            <TextField
              required
              style={{ width: "25%" }}
              label="Confirm password"
              placeholder="Re-enter your password"
              type="password"
              size="small"
            ></TextField>
          </div>
          <div id="reg_button">
            <Button
              variant="contained"
              size="medium"
              sx={{ height: 40, width: 660 }}
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
            >
              Register
            </Button>
          </div>
        </div>
        {/*{this.state.isRegistered ? (
        <Greet studentname={this.state.studentname}></Greet>
      ) : (
        <Register submit={this.registrationHandler}></Register>
      )}*/}
      </Paper>
    </div>
  );
}

export default Student_Registration;

const skillsets = [
  { title: "HTML" },
  { title: "CSS" },
  { title: "Python" },
  { title: "Javascript" },
];

const staffData = [
  { name: "Bharathy S", email: "bharathy.cse@sairam.edu.in" },
  { name: "Kavitha D", email: "kavitha.cse@sairam.edu.in" },
  { name: "Sharmika Shree", email: "sharmika.cse@sairam.edu.in" },
  { name: "Meera", email: "meera.cse@sairam.edu.in" },
];
