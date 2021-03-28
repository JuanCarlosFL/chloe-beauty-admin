import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginComponent } from './login.component';
import * as api from './api/login.api';
import * as viewModel from './login.vm';
import { CustomAlert } from 'common/components/alert';
import { SessionContext } from 'core/session-context';
import { AuthRoutes } from 'core/auth';

export const LoginContainer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { updateLogin, updateToken } = useContext(SessionContext);

  const handleLogin = async (login: viewModel.LoginVM) => {
    const isValid = await api.isValidLogin(login.username, login.password);

    if (isValid) {
      const token = await api.getToken(login.username, login.password);
      updateLogin(login.username);
      updateToken(token);
      history.push(AuthRoutes.menu);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
