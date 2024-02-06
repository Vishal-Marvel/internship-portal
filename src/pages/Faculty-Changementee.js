import { Avatar, Button, Stack, Checkbox, styled } from "@mui/material";
import './Faculty-Changementee.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const headerCellStyle = {
  backgroundColor: 'rgba(42, 212, 249, 0.9)',
  fontWeight: 'bold',
};

function createData(
  student_name: string,
  student_id: string,
  dept: string,
  status: string,
) {
  return { student_name, student_id, dept, status };
}

const staffDetails = {
  s1: { name: "STAFF 1", id: "STAFFID1", dept: "CSE" },
  s2: { name: "STAFF 2", id: "STAFFID2", dept: "ECE" },
  s3: { name: "STAFF 3", id: "STAFFID3", dept: "AI-DS" },
};

const rowsData = {
  s1: [
    createData('A1', '1', 'cse', 'Accepted'),
    createData('A2', '3', 'cse', 'Pending'),
    // ... (more rows for s1)
  ],
  s2: [
    createData('B1', '15', 'ece', 'Pending'),
    createData('B2', '19', 'ece', 'Pending'),
    // ... (more rows for s2)
  ],
  s3: [
    createData('C1', '41', 'ai-ds', 'Pending'),
    createData('C2', '43', 'ai-ds', 'Accepted'),
    // ... (more rows for s3)
  ],
};

function Faculty_Changementee() {
  const imageURL = "/bg/faculty.png";
  const staffIds = ["s1", "s2", "s3"];

  const [sourceStaff, setSourceStaff] = React.useState('');
  const [targetStaff, setTargetStaff] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedMentees, setSelectedMentees] = React.useState([]);

  const handleSourceStaffChange = (event) => {
    const selectedSourceStaff = event.target.value;
    setSourceStaff(selectedSourceStaff);
    setSelectedRows(selectedSourceStaff ? rowsData[selectedSourceStaff] : []);
    setSelectedMentees([]);
  };

  const handleTargetStaffChange = (event) => {
    const selectedTargetStaff = event.target.value;
    setTargetStaff(selectedTargetStaff);
  };

  const handleCheckboxSelect = (student_id) => {
    if (selectedMentees.includes(student_id)) {
      setSelectedMentees(selectedMentees.filter(id => id !== student_id));
    } else {
      setSelectedMentees([...selectedMentees, student_id]);
    }
  };
  const SubmitButton = styled(Button)(({ theme }) => ({
    color: "white",
    float: "right",
    marginRight: "45px",
    background: 'linear-gradient(135deg, rgba(0,211,148,1) 0%, rgba(19,144,184,1) 50%, rgba(0,211,148,1) 100%)',
  }));

  const handleMenteeSubmit = () => {
    if (sourceStaff && targetStaff) {
      const transferredMentees = selectedMentees.map(student_id => {
        const mentee = rowsData[sourceStaff].find(row => row.student_id === student_id);
        return {
          ...mentee,
          dept: staffDetails[targetStaff].dept,
        };
      });
      toast.success('Mentee transfer successfully changed!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
      });
      rowsData[targetStaff] = [...rowsData[targetStaff], ...transferredMentees];
      rowsData[sourceStaff] = rowsData[sourceStaff].filter(row => !selectedMentees.includes(row.student_id));
      setSelectedRows([]);
      setSelectedMentees([]);
      setSourceStaff('');
      setTargetStaff('');
    }
  };

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
          <div style={{ backgroundColor: "rgba(0, 233, 205, 0.44)", padding: "5px 0px", marginLeft: "45px", marginRight: "45px", borderRadius: "5px" }}>
            <Stack direction="row" justifyContent="space-between" >
              <h1 style={{ marginLeft: "25px" }}>Change mentee</h1>
              <Avatar style={{ marginRight: "25px" }} alt="ADMIN" src="/static/images/admin/" />
            </Stack>
            <Stack direction="row" justifyContent="" sx={{ marginTop: "10px" }}>
              <p style={{ fontSize: "18px", marginLeft: "35px" }}>From:</p>
              <div className="search-dropdown">
                <select onChange={handleSourceStaffChange} value={sourceStaff} style={{ width: "300px", height: "30px" }}>
                  <option value="">Select a staff...</option>
                  {staffIds.map((staffId) => (
                    <option key={staffId} value={staffId}>
                      {staffId}
                    </option>
                  ))}
                </select>
              </div>
              <p style={{ fontSize: "18px", marginLeft: "35px" }}>To:</p>
              <div className="search-dropdown">
                <select onChange={handleTargetStaffChange} value={targetStaff} style={{ width: "300px", height: "30px" }}>
                  <option value="">Select a staff...</option>
                  {staffIds.map((staffId) => (
                    <option key={staffId} value={staffId}>
                      {staffId}
                    </option>
                  ))}
                </select>
              </div>
            </Stack>
          </div>

          <div className="con" >
            <TableContainer component={Paper} style={{ maxHeight: 'calc(100vh - 250px)' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={headerCellStyle}>Actions</TableCell>
                    <TableCell style={headerCellStyle}>Student_name</TableCell>
                    <TableCell style={headerCellStyle}>Student_id</TableCell>
                    <TableCell style={headerCellStyle}>Department</TableCell>
                    <TableCell style={headerCellStyle}>Status</TableCell>
                    <TableCell style={headerCellStyle}>Internship details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRows.map((row) => (
                    <TableRow
                      key={row.student_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedMentees.includes(row.student_id)}
                          onChange={() => handleCheckboxSelect(row.student_id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.student_name}
                      </TableCell>
                      <TableCell>{row.student_id}</TableCell>
                      <TableCell>{row.dept}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {row.status === 'Accepted' ? (
                            <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '5px' }} />
                          ) : row.status === 'Pending' ? (
                            <HourglassFullIcon style={{ color: 'orange', marginRight: '5px' }} />
                          ) : (
                            <CancelIcon style={{ color: 'red', marginRight: '5px' }} />
                          )}
                          <span>{row.status}</span>
                        </div>
                      </TableCell>
                      <TableCell><SubmitButton size="small" variant="contained" href="#contained-buttons">view details</SubmitButton></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            
          </div>
          <SubmitButton
              variant="contained"
              color="primary"
              disabled={!sourceStaff || !targetStaff || selectedMentees.length === 0}
              onClick={handleMenteeSubmit}
              
            >
              Submit
            </SubmitButton>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

        </div>
      </div>
    </div>
  );
}

export default Faculty_Changementee;
