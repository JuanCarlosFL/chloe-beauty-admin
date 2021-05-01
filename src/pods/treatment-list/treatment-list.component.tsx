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
  import { TreatmentVM } from './treatment-list.vm';
  // Tipamos las props
  interface Props {
    treatmentList: TreatmentVM[];
    handleDelete: (id: number) => void;
    handleBack: () => void;
    handleEdit: (id: string) => void;
    handleCreate: (id: string) => void;
  }
  
  export const TreatmentListComponent: React.FC<Props> = props => {
    // Guardamos las props recibidas
    const {
      treatmentList,
      handleDelete,
      handleBack,
      handleEdit,
      handleCreate,
    } = props;
    // Pintamos una tabla con la colección de tratamientos
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreate('0')}
        >
          Crear tratamiento
        </Button>
        <TableContainer component={Paper} style={{ margin: '1rem 0' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Duración</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Puntos</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Iteramos sobre la colección para pintar las filas con los registros */}
              {treatmentList.map(treatment => (
                <TableRow key={treatment.TreatmentId}>
                  <TableCell component="th" scope="row">
                    {treatment.Name}
                  </TableCell>
                  <TableCell align="right">{treatment.Duration}</TableCell>
                  <TableCell align="right">{treatment.Price}</TableCell>
                  <TableCell align="right">{treatment.Points}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(treatment.TreatmentId.toString())}
                    >
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(treatment.TreatmentId)}
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
  