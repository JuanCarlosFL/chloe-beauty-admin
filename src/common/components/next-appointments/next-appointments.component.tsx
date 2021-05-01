import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { NextAppointmentsVM } from './next-appointments.vm';
import { getFormatDate } from 'core/dates';

interface Props {
    appointments: NextAppointmentsVM[]
}
// Este componente mustra una lista de las próximas citas
export const NextAppointmentsComponent: React.FC<Props> = (props) => {
  // Guardamos la colección de citas que vienen por props
  const {appointments} = props;
  // Creamos una tabla para mostrar las citas
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
          {/* Iteramos sobre la colección de citas para mostrar una en cada fila */}
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