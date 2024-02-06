import React, { useState } from "react";
import {Avatar,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,TextField} from "@mui/material";
import './Faculty-Studentlist.css';

const headerCellStyle = {
  backgroundColor: 'rgba(42, 212, 249, 0.9)',
  fontWeight: 'bold',
};

function createData(
  stud_name: string,
  stud_ID: string,
  dept: string,
  intern_count: string,
  status: string,
) {
  return { stud_name, stud_ID, dept, intern_count, status };
}

const rows = [
  createData('arun', 'cs01', 'CSE', '2', ''),
  createData('dhanush', 'ec01', 'ECE', '3', ''),
  createData('leo', 'cse01', 'CSE', '1', ''),
  createData('tiger', 'ic01', 'ICE', '4', ''),
  createData('rishi', 'cs03', 'CSE', '2', ''),
  createData('vishal', 'ec02', 'ECE', '5', ''),
  createData('srivatsav', 'ai01', 'AI-DS', '0', ''),
  createData('ghiri', 'me01', 'MECH', '2', ''),
  createData('lakshman', 'mc01', 'MTECH-CSE', '1', ''),
  createData('dhinesh', 'ei01', 'EIE', '3', ''),
];

function Faculty_Studentlist() {
  const imageURL = "/bg/faculty.png";

  const [selectedName, setSelectedName] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [selectedinternCount, setSelectedInternCount] = useState('');

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  const handleIDChange = (event) => {
    setSelectedID(event.target.value);
  };

  const handleinternCountChange = (event) => {
    setSelectedInternCount(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const nameFilter =
      selectedName === '' ||
      row.stud_name.toLowerCase().includes(selectedName.toLowerCase());
    const deptFilter = selectedDept === '' || row.dept === selectedDept;
    const idFilter =
      selectedID === '' || row.stud_ID.toLowerCase().includes(selectedID.toLowerCase());
    const internCountFilter =
      selectedinternCount === '' || row.intern_count === selectedinternCount;

    return nameFilter && deptFilter && idFilter && internCountFilter;
  });

  

  // Extract department and intern count options from your data
  const deptOptions = [...new Set(rows.map((row) => row.dept))];
  const internOptions = [...new Set(rows.map((row) => row.intern_count))];

  return (
    <div
      style={{
        backgroundImage: `url(${imageURL})`,
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
              <h1 style={{ marginLeft: "45px" }}>STUDENT LIST</h1>
              <Avatar style={{ marginRight: "45px", marginTop: "5px", marginBottom: "0px" }} alt="A" src="/static/images/admin/" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: "10px" }} spacing={1}>
              <div style={{ width: "170px", height: "25px",marginLeft:"40px" }}>
                <TextField
                  size="small"
                  style={{background: "white" }}
                  fullWidth
                  label="Search by Name"
                  onChange={handleNameChange}
                  value={selectedName}
                />
              </div>
              <div style={{ width: "170px", height: "25px" }}>
                <TextField
                  size="small"
                  style={{background: "white" }}
                  fullWidth
                  label="Search by ID"
                  onChange={handleIDChange}
                  value={selectedID}
                />
              </div>
              <div className="search-dropdown">
                <select
                  onChange={handleDeptChange}
                  value={selectedDept}
                  style={{ height: "42px" }}
                >
                  <option value="">Search by Department</option>
                  {deptOptions.map((fDept) => (
                    <option key={fDept} value={fDept}>
                      {fDept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="search-dropdown">
                <select
                  onChange={handleinternCountChange}
                  value={selectedinternCount}
                  style={{ width: "170px", height: "42px" ,marginRight:"25px"}}
                >
                  <option value="">Search by Intern Count</option>
                  {internOptions.map((inte) => (
                    <option key={inte} value={inte}>
                      {inte}
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
                    <TableCell style={headerCellStyle}>Student Name</TableCell>
                    <TableCell style={headerCellStyle}>Student ID</TableCell>
                    <TableCell style={headerCellStyle}>Department</TableCell>
                    <TableCell style={headerCellStyle}>Intern Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow
                      key={row.stud_ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.stud_name}
                      </TableCell>
                      <TableCell>{row.stud_ID}</TableCell>
                      <TableCell>{row.dept}</TableCell>
                      <TableCell>{row.intern_count}</TableCell>
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

export default Faculty_Studentlist;
