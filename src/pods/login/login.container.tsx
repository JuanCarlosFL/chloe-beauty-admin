import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginComponent } from './login.component';
import * as api from './api/login.api';
import * as viewModel from './login.vm';
import { CustomAlert } from 'common/components/alert';
import { SessionContext } from 'core/session-context';
import { AuthRoutes } from 'core/auth';

export const LoginContainer: React.FC = () => {
  // Creamos una variable a false para el alert
  const [open, setOpen] = useState(false);
  // Guardamos el historial del navegador
  const history = useHistory();
  // Guardamos lo que necesitamos del context
  const { updateLogin, updateToken, updateRole } = useContext(SessionContext);

  // Función encargada de hacer el login del usuario
  const handleLogin = async (login: viewModel.LoginVM) => {
    // Llamamos a la función pasándole el username y el password como parámetros
    const isValid = await api.isValidLogin(login.username, login.password);
    // si devuelve true
    if (isValid) {
      // obtenemos un nuevo token para el usuario
      const token = await api.getToken(login.username, login.password);
      // Obtenemos el rol del usuario
      const role = await api.getRole(login.username);
      // Actualizamos el login, token y rol de usuario
      updateLogin(login.username);
      updateToken(token);
      updateRole(role);
      // Redirigimos al menú
      history.push(AuthRoutes.menu);
    } else {
      // En caso contrario abrimos el alert para mostrar el mensaje
      setOpen(true);
    }
  };
  // Función para cerrar el alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  // Llamamos al componente pasándole por props los datos
  return (
    <>
      <LoginComponent onLogin={handleLogin} />
      <CustomAlert
        message="Usuario o contraseña incorrecta"
        severity="error"
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
