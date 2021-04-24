import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { AppointmentsVM } from './availabilities.vm';
import { getFormatDate } from 'core/dates';

interface Props {
    appointments: AppointmentsVM[]
}

export const AvailabilitiesComponent: React.FC<Props> = (props) => {
    const {appointments} = props;

    return (
       <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Tratamiento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(appointment => (
              <TableRow key={appointment.AppointmentDate}>
                <TableCell component="th" scope="row">
                  {appointment.PersonName}
                </TableCell>
                <TableCell>
                  { getFormatDate(appointment.AppointmentDate) }
                </TableCell>
                <TableCell component="th" scope="row">
                  {appointment.TreatmentName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}