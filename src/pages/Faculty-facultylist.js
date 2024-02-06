import { Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, styled, Button } from "@mui/material";
import './Faculty-facultylist.css'
import React, { useState, useEffect}  from 'react';


const headerCellStyle = {
  backgroundColor: 'rgba(42, 212, 249, 0.9)',
  fontWeight: 'bold',
};

function createData(
  faculty_name: string,
  faculty_ID: string,
  faculty_dept: string,
) {
  return { faculty_name, faculty_ID, faculty_dept };
}

const rows = [
  createData('arun', 'cs01', 'CSE'),
  createData('dhanush', 'ec01', 'ECE'),
  createData('leo', 'cse01', 'CSE'),
  createData('tiger', 'ic01', 'ICE'),
  createData('rishi', 'cs03', 'CSE'),
  createData('vishal', 'ec02', 'ECE'),
  createData('srivatsav', 'ai01', 'AI-DS'),
  createData('ghiri', 'me01', 'MECH'),
  createData('lakshman', 'mc01', 'MTECH-CSE'),
  createData('dhinesh', 'ei01', 'EIE'),
];

function Faculty_facultylist() {
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


  const [selectedDept, setSelectedDept] = React.useState('');
  const [selectedStudent, setSelectedStudent] = React.useState('');

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const fac_dept = [...new Set(rows.map(row => row.faculty_dept))];

  const filteredRows = rows.filter((row) => {
    const deptFilter = selectedDept === '' || row.faculty_dept === selectedDept;
    const nameFilter = selectedStudent === '' || row.faculty_name.toLowerCase().includes(selectedStudent.toLowerCase());
    return deptFilter && nameFilter;
  }).sort((a, b) => a.faculty_name.localeCompare(b.faculty_name));

  const SubmitButton = styled(Button)(({ theme }) => ({
    color: "white",
    marginRight: "45px",
    background: 'linear-gradient(135deg, rgba(0,211,148,1) 0%, rgba(19,144,184,1) 50%, rgba(0,211,148,1) 100%)',
  }));
  

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
          <div className="navbar">
            <Stack direction="row" justifyContent="space-between">
              <h1 style={{ marginLeft: "45px" }}>FACULTY LIST</h1>
              <Avatar style={{ marginRight: "45px", marginTop: "5px", marginBottom: "0px" }} alt="A" src="/static/images/admin/" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: "10px" }}>
              <div style={{ width: "350px", height: "25px" }}>
                <TextField size="small" style={{marginLeft:"45px",background:"white"}}fullWidth label="Enter Faculty Name" onChange={handleStudentChange} value={selectedStudent} />
              </div>
              <div className="search-dropdown">
                <select onChange={handleDeptChange} value={selectedDept} style={{ width: "350px", height: "42px" }}>
                  <option value="">Select a Department</option>
                  {fac_dept.map(fDept => (
                    <option key={fDept} value={fDept}>
                      {fDept}
                    </option>
                  ))}
                </select>
              </div>
            </Stack>
          </div>
          <div className="con">
            <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={headerCellStyle}>Faculty name</TableCell>
                    <TableCell style={headerCellStyle}>Faculty ID</TableCell>
                    <TableCell style={headerCellStyle}>Faculty Dept</TableCell>
                    <TableCell style={headerCellStyle}>Faculty Details</TableCell>
                    <TableCell style={headerCellStyle}>Mentee list</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow
                      key={row.faculty_ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.faculty_name}
                      </TableCell>
                      <TableCell>{row.faculty_ID}</TableCell>
                      <TableCell>{row.faculty_dept}</TableCell>
                      <TableCell><SubmitButton>View Details</SubmitButton></TableCell>
                      <TableCell><SubmitButton>View Details</SubmitButton></TableCell>

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

export default Faculty_facultylist;
