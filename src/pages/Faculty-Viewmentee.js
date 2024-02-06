import { Avatar, InputBase, Stack, SwipeableDrawer } from "@mui/material";
import './Faculty-Viewmentee.css'
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
  stud_name: string,
  stud_ID: string,
  intern_count: string,
  status: string,
) {
  return { stud_name, stud_ID, intern_count, status };
}

const rows = [
  createData(' A', 'sec21cs011', '1', 'in progress'),
  createData(' B', 'sec21cs059', '0', 'in progress'),
  createData(' C', 'Sec21cs089', '2', 'Nil'),
  createData(' A', 'sec21cs011', '3', 'Nil'),
  createData(' B', 'sec21cs059', '0', 'Nil'),
  createData(' C', 'Sec21cs089', '2', 'in progress'),
  createData(' A', 'sec21cs011', '3', 'Nil'),
  createData(' B', 'sec21cs059', '1', 'in progress'),
  createData(' C', 'Sec21cs089', '2', 'Nil'),
  createData(' B', 'sec21cs054', '0', 'in progress'),
];

function Faculty_Viewmentee() {
  const imageURL = "/bg/faculty.png";

  const [selectedStudent, setSelectedStudent] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [selectedInternCount, setSelectedInternCount] = React.useState('');

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleInternCountChange = (event) => {
    setSelectedInternCount(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const studentFilter = selectedStudent === '' || row.stud_ID === selectedStudent;
    const statusFilter =
      selectedStatus === '' || row.status === selectedStatus; // Allow all statuses when selectedStatus is empty
    const internCountFilter =
      selectedInternCount === '' || row.intern_count === selectedInternCount;
  
    return studentFilter && statusFilter && internCountFilter;
  });

  // Extract unique student IDs from the rows array
  const studentIds = [...new Set(rows.map(row => row.stud_ID))];

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
              <h1 style={{ marginLeft: "45px" }}>Mentee's list</h1>
              <Avatar style={{ marginRight: "45px", marginTop: "5px", marginBottom: "0px" }} alt="S" src="/static/images/student/" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: "10px" }}>
              <div className="search-dropdown">
                <select onChange={handleStudentChange} value={selectedStudent} style={{ width: "166px", height: "25px" }}>
                  <option value="">Select a student...</option>
                  {studentIds.map(studentId => (
                    <option key={studentId} value={studentId}>
                      {studentId}
                    </option>
                  ))}
                </select>
              </div>
              <div className="search-dropdown">
                <select onChange={handleInternCountChange} value={selectedInternCount} style={{ width: "166px", height: "25px" }}>
                  <option value="">No.of interns</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="search-dropdown">
                <select onChange={handleStatusChange} value={selectedStatus} style={{ width: "166px", height: "25px" }}>
                  <option value="">Status</option>
                  <option value="in progress">Ongoing</option>
                  <option value="Nil">Nil</option>
                </select>
              </div>
            </Stack>
          </div>
          <div className="con">
            <TableContainer component={Paper} style={{ maxHeight: '100%' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={headerCellStyle}>Student name</TableCell>
                    <TableCell style={headerCellStyle}>Student ID</TableCell>
                    <TableCell style={headerCellStyle}>No.of stud_ID</TableCell>
                    <TableCell style={headerCellStyle}>Intern Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.stud_name}
                      </TableCell>
                      <TableCell>{row.stud_ID}</TableCell>
                      <TableCell>{row.intern_count}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {row.status === 'Nil' ? (
                            <CancelIcon style={{ color: 'red', marginRight: '5px' }} />
                          ) : (
                            <HourglassFullIcon style={{ color: 'orange', marginRight: '5px' }} />
                          ) }
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

export default Faculty_Viewmentee;
