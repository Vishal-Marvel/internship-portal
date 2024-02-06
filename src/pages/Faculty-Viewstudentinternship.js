import { Avatar,  InputBase,  Stack, SwipeableDrawer } from "@mui/material";
import './Faculty-Viewstudentinternship.css'
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
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
const headerCellStyle = {
  backgroundColor: 'rgba(42, 212, 249, 0.9)', 
  fontWeight: 'bold',
};
function createData(
  company: string,
  intern: string,
  appliedOn: string,
  status: string,
) {
  return { company, intern, appliedOn, status };
}

const rows = [
  createData('Company A', 'web dev', '2023-08-15', 'Accepted'),
  createData('Company B', 'app dev', '2023-08-20', 'Pending'),
  createData('Company C', 'blockchain', '2023-08-10', 'Rejected'),
  createData('Company D', 'app dev', '2023-08-25', 'Pending'),
  createData('Company E', 'app dev', '2023-08-18', 'Accepted'),
  createData('Company A', 'web dev', '2023-08-15', 'Accepted'),
  createData('Company B', 'blockchain', '2023-08-20', 'Pending'),
  createData('Company C', 'web dev', '2023-08-10', 'Rejected'),
  createData('Company D', 'app dev', '2023-08-25', 'Pending'),
  createData('Company E', 'blockchain', '2023-08-18', 'Accepted'),
];


function Faculty_Viewstudentinternship() {
  const imageURL="/bg/faculty.png"
  const studentIds = ["sec21cs001", "sec21cs010", "sec21cs089", "sec21cs099"];
  
  // State to track the selected student
  const [selectedStudent, setSelectedStudent] = React.useState('');
  
  // A mapping of student IDs to their corresponding name and ID
  const studentDetails = {
    sec21cs001: { name: "Student 1", id: "SEC21CS001" },
    sec21cs010: { name: "Student 10", id: "SEC21CS010" },
    sec21cs089: { name: "Student 89", id: "SEC21CS089" },
    sec21xs099: { name: "Student 99", id: "SEC21CS099" },
  };
  
  // Function to handle dropdown change
  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
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
    <div className="container" >
      <div style={{backgroundColor:"rgba(0, 233, 205, 0.44)",padding:"5px 0px",marginLeft:"45px",marginRight:"45px",borderRadius:"5px"}}>
      <Stack direction="row" justifyContent="space-between" > 
      <h1 style={{marginLeft: "25px"}}>Internships Details</h1>
      <Avatar style={{marginRight:"25px"}}alt="S" src="/static/images/student/" />
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{marginTop:"10px"}}>
  <div className="stud">
  <Stack direction="row" justifyContent="space-between">
    <Avatar style={{ width: '40px', height: '40px' }} alt="S" src="/static/images/student/" />
    <div style={{textAlign:"center"}}>
      <p>{studentDetails[selectedStudent]?.name || "STUDENT NAME"}</p>
      <p>{studentDetails[selectedStudent]?.id || "STUDENT ID"}</p>
    </div>
    
  </Stack>
  
</div>
<div className="search-dropdown">
  <select onChange={handleStudentChange} value={selectedStudent} style={{width: "550px",
  height: "50px"}}>
    <option value="">Select a student...</option>
    {studentIds.map((studentId) => (
      <option key={studentId} value={studentId}>
        {studentId}
      </option>
    ))}
  </select>
</div>
      </Stack>
      </div>
      <div className="con" >
      <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell style={headerCellStyle}>Company</TableCell>
        <TableCell style={headerCellStyle}>Intern</TableCell>
        <TableCell style={headerCellStyle}>Applied On</TableCell>
        <TableCell style={headerCellStyle}>Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.company}
          </TableCell>
          <TableCell>{row.intern}</TableCell>
          <TableCell>{row.appliedOn}</TableCell>
          
            
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

export default Faculty_Viewstudentinternship;
