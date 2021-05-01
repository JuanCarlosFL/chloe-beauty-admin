import React from 'react';
import { TreatmentVM } from 'pods/treatment-list/treatment-list.vm';
import { Formik, Form, Field } from 'formik';
import { Button, Grid, withStyles } from '@material-ui/core';
import { TextFieldComponent } from 'common/form';
import { formValidation } from './treatment.validation';
// Modificamos estilos del botón
const CancelButton = withStyles(() => ({
  root: {
    backgroundColor: '#bb2124',
    '&:hover': {
      backgroundColor: '#c4383a',
    },
  },
}))(Button);
// Tipamos las props
interface Props {
    id: string;
    treatment: TreatmentVM;
    onCreate: (treatment: TreatmentVM) => void;
    onCancel: () => void;
  }

export const TreatmentComponent: React.FC<Props> = props => {
  // Guardamos la info que nos viene por props
  const { id, treatment, onCancel, onCreate } = props;
  // Pintamos el formulario para poder modificar o crear un nuevo registro
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Grid
      container
      alignItems="center"
      direction="column"
      justify="center"
      style={{ padding: '10' }}
    >
      <Formik
        onSubmit={onCreate}
        initialValues={treatment}
        enableReinitialize={true}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form>
            <div style={{ height: 30 }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 400,
                minWidth: 350,
              }}
            >
              <Field name="treatmentId" label="Id" hidden />
              <TextFieldComponent name="Name" label="Nombre" />
              <TextFieldComponent name="Duration" type="number" label="Duración" />
              <TextFieldComponent name="Price" type="number" label="Precio" />
              <TextFieldComponent name="Points" type="number" label="Puntos" />
              <Grid container justify="space-between" spacing={2}>
                <Button
                  type="submit"
                  size="medium"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: '25px' }}
                >
                  Guardar
                </Button>
                <div style={{ height: 20 }} />
                <CancelButton
                  color="secondary"
                  size="medium"
                  variant="contained"
                  onClick={onCancel}
                  style={{ marginTop: '25px' }}
                >
                  Cancelar
                </CancelButton>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </Grid>
  </div>
  );
};
