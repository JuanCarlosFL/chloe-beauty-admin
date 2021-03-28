import { Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { TextFieldComponent } from 'common/form';
import React from 'react';
import { LoginVM, createEmptyLogin } from './login.vm';
import { formValidation } from './login.validation';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

interface Props {
  onLogin: (login: LoginVM) => void;
}

export const LoginComponent: React.FC<Props> = props => {
  const { onLogin } = props;
  return (
    <Card style={{ marginTop: '5rem' }}>
      <CardHeader title="Login" />
      <CardContent>
        <Formik
          onSubmit={onLogin}
          initialValues={createEmptyLogin()}
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
                <TextFieldComponent name="username" label="Usuario" />
                <TextFieldComponent
                  name="password"
                  label="Contraseña"
                  type="password"
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ marginTop: '15px' }}
                >
                  Iniciar sesión
                </Button>
                <div style={{ height: 20 }} />
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
