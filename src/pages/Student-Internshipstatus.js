import { Avatar,  InputBase,  Stack, SwipeableDrawer } from "@mui/material";
import './Student-Internshipstatus.css'
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
  createData('Company A', 'John Doe', '2023-08-15', 'Accepted'),
  createData('Company B', 'Jane Smith', '2023-08-20', 'Pending'),
  createData('Company C', 'Sam Johnson', '2023-08-10', 'Rejected'),
  createData('Company D', 'Alex Brown', '2023-08-25', 'Pending'),
  createData('Company E', 'Emily White', '2023-08-18', 'Accepted'),
  createData('Company A', 'John Doe', '2023-08-15', 'Accepted'),
  createData('Company B', 'Jane Smith', '2023-08-20', 'Pending'),
  createData('Company C', 'Sam Johnson', '2023-08-10', 'Rejected'),
  createData('Company D', 'Alex Brown', '2023-08-25', 'Pending'),
  createData('Company E', 'Emily White', '2023-08-18', 'Accepted'),
];


function Student_Internshipstatus() {
  const imageURL="/bg/sec.png"
  
  
  
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
      <Stack direction="row" justifyContent="space-between"  style={{backgroundColor: "rgba(0, 233, 205, 0.44)" ,marginLeft:"45px" ,marginRight:"45px",padding:"15px 0px"}}> 
      <h1 style={{marginLeft: "45px"}}>Internships Details</h1>
      <div className="stud">
        <Stack direction="row" justifyContent="space-between">
          <div>

          </div>
          <div style={{alignItems:"center",textAlign:"center"}}>
            <p>STUDENT NAME</p>
            <p>STUDENT ID</p>
          </div>
        
          <Avatar alt="S" src="/static/images/student/" />
        </Stack>
      </div>

      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{marginTop:"10px"}}>
  

      </Stack>
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

export default Student_Internshipstatus;
