import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { Customer } from './customer-list.vm';

interface Props {
  customerList: Customer[];
  onDelete: (id: number) => void;
}

export const CustomerListComponent: React.FC<Props> = props => {
  const { customerList, onDelete } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell align="right">Teléfono</TableCell>
            <TableCell align="right">Dirección</TableCell>
            <TableCell align="right">Ciudad</TableCell>
            <TableCell align="right">Código postal</TableCell>
            <TableCell align="right">Puntos</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Comentario</TableCell>
            <TableCell align="right">Contactos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerList.map(customer => (
            <TableRow key={customer.PersonId}>
              <TableCell component="th" scope="row">
                {customer.Name}
              </TableCell>
              <TableCell>{customer.Surname}</TableCell>
              <TableCell align="right">{customer.Telephone}</TableCell>
              <TableCell align="right">{customer.Address}</TableCell>
              <TableCell align="right">{customer.Town}</TableCell>
              <TableCell align="right">{customer.PostCode}</TableCell>
              <TableCell align="right">{customer.Points}</TableCell>
              <TableCell align="right">{customer.Email}</TableCell>
              <TableCell align="right">{customer.Comments}</TableCell>
              <TableCell align="right">{customer.ContactNow}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
