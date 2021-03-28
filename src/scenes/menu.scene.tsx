import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NonAuthRoutes } from 'core/auth';
import { SessionContext } from 'core/session-context';

export const MenuScene: React.FC = () => {
  const { login } = useContext(SessionContext);
  return (
    <>
      <h1>Menú Scene!</h1>
      <Link to={NonAuthRoutes.login}>{login}</Link>
    </>
  );
};
