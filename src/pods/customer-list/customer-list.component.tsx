import {
  Button,
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
  handleDelete: (id: number) => void;
  handleBack: () => void;
  handleEdit: (id: string) => void;
  handleCreate: (id: string) => void;
}

export const CustomerListComponent: React.FC<Props> = props => {
  const {
    customerList,
    handleDelete,
    handleBack,
    handleEdit,
    handleCreate,
  } = props;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCreate('0')}
      >
        Crear cliente
      </Button>
      <TableContainer component={Paper} style={{ margin: '1rem 0' }}>
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
              <TableCell></TableCell>
              <TableCell></TableCell>
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
                <TableCell align="right">{customer.ContactHow}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(customer.PersonId.toString())}
                  >
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(customer.PersonId)}
                  >
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={handleBack}>
        Volver
      </Button>
    </>
  );
};
