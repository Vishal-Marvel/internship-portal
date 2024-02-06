import React, { useState, useEffect}  from 'react';
import { Avatar, Button, Stack, styled } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Faculty-facultylist-menteedetails.css';


const headerCellStyle = {
  backgroundColor: 'rgba(42, 212, 249, 0.9)',
  fontWeight: 'bold',
};

function createData(
  student_name: string,
  student_id: string,
  dept: string,
  intern_days_completed: string,
) {
  return { student_name, student_id, dept, intern_days_completed };
}

const staffDetails = {
  name: "FACULTY_NAME",
  id: "FACULTY_ID",
  dept: "FACULTY_DEPT",
};

const mentee_data = [
  createData('A1', '1', 'cse','15'),
  createData('A2', '3', 'cse','30'),
  createData('A3', '7', 'cse','0'),
  createData('A4', '5', 'cse','45'),
  createData('A5', '10', 'cse','15'),
  createData('A6', '12', 'cse','0'),
];

const SubmitButton = styled(Button)(({ theme }) => ({
  color: "white",
  
  marginRight: "45px",
  background: 'linear-gradient(135deg, rgba(0,211,148,1) 0%, rgba(19,144,184,1) 50%, rgba(0,211,148,1) 100%)'
  

}));

function Faculty_facultylist_menteedetails() {

  const [currBackgroundImage, setBackgroundImage] = useState('/bg/faculty.png'); // state for background image, default picture is sec image

  const preloadImages = ['/bg/sec.png', '/bg/sit.png', '/bg/faculty.png'];// preloading initializxation

  useEffect(() => {
    preloadImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, []);

  const handleImageChange = (newImage) => {
    setBackgroundImage(`/bg/${newImage}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${currBackgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="parent-container">
        <div className="container">
          <div style={{ backgroundColor: "rgba(0, 233, 205, 0.44)", padding: "5px 0px", marginLeft: "45px", marginRight: "45px", borderRadius: "5px", height: "15%" }}>
            <Stack direction="row" justifyContent="space-between" >
              <h1 style={{ marginLeft: "25px" }}>FACULTY LIST</h1>
              <Avatar style={{ marginRight: "25px" }} alt="ADMIN" src="/static/images/admin/" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" >
              <div className="stud">
                <Stack direction="row" justifyContent="space-between">
                  <Avatar style={{ width: '40px', height: '40px' }} alt="Staff" src="/static/images/staff/" />
                  <p style={{ padding: "12px" }}>{staffDetails.name || "staff NAME"}</p>
                  <p style={{ padding: "12px" }}>{staffDetails.id || "staff ID"}</p>
                  <p style={{ padding: "12px" }}>{staffDetails.dept || " staff DEPT"}</p>
                </Stack>
              </div>
            </Stack>
          </div>
          <div className="con" >
            <TableContainer component={Paper} style={{ maxHeight: 'calc(100vh - 250px)' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={headerCellStyle}>Student_name</TableCell>
                    <TableCell style={headerCellStyle}>Student_id</TableCell>
                    <TableCell style={headerCellStyle}>Department</TableCell>
                    <TableCell style={headerCellStyle}>intern_days_completed</TableCell>
                    <TableCell style={headerCellStyle}>Internship details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mentee_data.map((row) => (
                    <TableRow key={row.student_id}>
                      <TableCell component="th" scope="row">
                        {row.student_name}
                      </TableCell>
                      <TableCell>{row.student_id}</TableCell>
                      <TableCell>{row.dept}</TableCell>
                      <TableCell>{row.intern_days_completed}</TableCell>
                      <TableCell><SubmitButton size="small" href="#contained-buttons">view details</SubmitButton></TableCell>
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

export default Faculty_facultylist_menteedetails;
