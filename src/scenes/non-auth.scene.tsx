import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NonAuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';

export const NonAuthScene: React.FC = () => {
  const { login } = useContext(SessionContext);
  return (
    <>
      <h1>El usuario {login} no está autorizado en este sitio</h1>
      <Link to={NonAuthRoutes.login}>Inicio</Link>
    </>
  );
};
