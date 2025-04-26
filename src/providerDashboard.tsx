import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';

function createData(patient_name:string ,vaccine:string, status:string, action:string) {
  return { patient_name,vaccine, status, action };
}

const rows = [
  createData('Ganesh', "overdue","status", "Edit Delete  Add"),
  createData('Suresh', "upcomming","status", "Edit  Delete  Add"),
  createData('Ramesh', "30-Nov-2024","status", "Edit Delete  Add"),
  createData('Nagesh', "overdue","status", "Edit Delete  Add"),
  createData('Yabesh', "overdue","status", "Edit Delete  Add"),
];



export default function ProviderDashboard() {

    React.useEffect(() => {
        const fetchCounter = async () => {
          try {
          // DATABASE GET CALL for vaccine table
          } catch (err) {
            // setError(err.message); 
          } finally {
            // setLoading(false); 
          }
        };    
        fetchCounter(); 
      }, []); 

  return (
    <TableContainer component={Paper}>
        <h2 style={{"textAlign":"center"}}>Provider Vaccine & Immunization Tracking System</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.vaccine}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {row.patient_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.vaccine}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell  align="right">{row.action} <Link to={`/crayons/${row}`}>{}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}