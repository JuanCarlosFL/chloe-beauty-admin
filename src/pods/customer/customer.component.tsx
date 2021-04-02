import {
  createEmptyCustomer,
  Customer,
} from 'pods/customer-list/customer-list.vm';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Grid, withStyles } from '@material-ui/core';
import { TextFieldComponent } from 'common/form';
import { formValidation } from './customer.validation';

const CancelButton = withStyles(() => ({
  root: {
    backgroundColor: '#bb2124',
    '&:hover': {
      backgroundColor: '#c4383a',
    },
  },
}))(Button);

interface Props {
  id: string;
  customer: Customer;
  onCreate: (customer: Customer) => void;
  onCancel: () => void;
}

export const CustomerComponent: React.FC<Props> = props => {
  const { id, customer, onCancel, onCreate } = props;
  console.log(customer.Name);

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
          initialValues={id === '0' ? createEmptyCustomer : customer}
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
                <TextFieldComponent name="Name" label="Nombre" />
                <TextFieldComponent name="Surname" label="Apellidos" />
                <TextFieldComponent name="Email" label="Email" />
                <TextFieldComponent name="Telephone" label="Teléfono" />
                <TextFieldComponent name="Address" label="Dirección" />
                <TextFieldComponent name="Town" label="Ciudad" />
                <TextFieldComponent name="PostCode" label="Código Postal" />
                <TextFieldComponent name="Points" label="Puntos" />
                <TextFieldComponent name="Comments" label="Comentario" />
                <TextFieldComponent
                  name="ContactHow"
                  label="¿Cómo me conoció?"
                />
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
