import { Avatar, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Faculty-Viewstudentregister.css";
import profilepicture from "./profilepic/profilepicture.jpg";

const headerCellStyle = {
  backgroundColor: "rgba(42, 212, 249, 0.9)",
  fontWeight: "bold",
};
function createData(parameters: string, details: string | JSX.Element) {
  return { parameters, details };
}

const rows = [
  createData("Student name", "Hemaa c"),
  createData("College name", "Sri Sairam Engineering College"),
  createData("Student ID", "sec21xxxxx"),
  createData("Register number ", "41252110xxxx"),
  createData("Year of studying", "III"),
  createData("Department", "CSE"),
  createData("Student email", "sec21xxxxx@sairamtap.edu.in"),
  createData("Phone number", "1234567891"),
  createData(
    "Profile picture",
    <Avatar alt="Profile Picture" src={profilepicture} />
  ),
  createData("Skills", "HTML,CSS,Python"),
  createData("Mentor name", "Bharathy S"),
  createData("Mentor email", "bharathy.cse@sairam.edu.in"),
];

function Faculty_Viewstudentregister() {
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
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="parent-container">
        <div className="container">
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{
              background: `linear-gradient(135deg,rgba(64, 201, 232, 0.9),rgba(0,233,205,0.4))`,
              marginLeft: "45px",
              marginRight: "45px",
              padding: "25px 0px",
            }}
          >
            <h1 style={{ marginLeft: "40px" }}>
              View Student Registration Details
            </h1>
            <div className="stud">
              <Stack direction="row" justifyContent="space-between">
                <div></div>
                <div style={{ alignItems: "center", textAlign: "center" }}>
                  <h6
                    style={{
                      padding: "0px 0px",
                      marginLeft: "0px",
                      marginTop: "20px",
                    }}
                  >
                    STUDENT NAME{" "}
                  </h6>
                  <h6
                    style={{
                      padding: "0px 0px",
                      marginLeft: "0px",
                      marginBottom: "0px",
                    }}
                  >
                    STUDENT ID
                  </h6>
                </div>

                <Avatar
                  style={{ marginTop: "25px" }}
                  alt="S"
                  src="/static/images/student/"
                />
              </Stack>
            </div>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "10px" }}
          ></Stack>
          <div className="con">
            <TableContainer component={Paper} style={{ maxHeight: "100%" }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={headerCellStyle}>Parameters</TableCell>
                    <TableCell style={headerCellStyle}>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.parameters}
                      </TableCell>
                      <TableCell>
                        {typeof row.details === "string" ? (
                          row.details
                        ) : (
                          <div>{row.details}</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faculty_Viewstudentregister;
