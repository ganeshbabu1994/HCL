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

function createData(vaccine:any, status:any, action:any) {
  return { vaccine, status, action };
}

const rows = [
  createData('Covishield', "overdue", "Edit Delete  Add"),
  createData('Covaxin', "upcomming", "Edit  Delete  Add"),
  createData('HepB', "30-Nov-2024", "Edit Delete  Add"),
  createData('DTaP', "overdue", "Edit Delete  Add"),
  createData('RoTAVirus', "overdue", "Edit Delete  Add"),
];

export default function Dashboard() {
  return (
    <TableContainer component={Paper}>
        <h2 style={{"textAlign":"center"}}>Patient Vaccine & Immunization Tracking System</h2>
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