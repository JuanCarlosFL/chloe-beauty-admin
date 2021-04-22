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
import { LoyaltyVM } from './loaylty-list.vm';

interface Props {
    loyaltyList: LoyaltyVM[];
    handleDelete: (id: number) => void;
    handleBack: () => void;
    handleEdit: (id: string) => void;
    handleCreate: (id: string) => void;
}

export const LoyaltyListComponent: React.FC<Props> = props => {
    const {
        loyaltyList,
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
          Crear Oferta
        </Button>
        <TableContainer component={Paper} style={{ margin: '1rem 0' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Puntos</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loyaltyList.map(loyalty => (
                <TableRow key={loyalty.LoyaltyId}>
                  <TableCell component="th" scope="row">
                    {loyalty.TreatmentName}
                  </TableCell>
                  <TableCell align="right">{loyalty.Points}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(loyalty.LoyaltyId.toString())}
                    >
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(loyalty.LoyaltyId)}
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
    )
}