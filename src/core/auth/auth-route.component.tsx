import { SessionContext } from 'core/session-context';
import React, { useContext } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { NonAuthRoutes } from './user-roles';

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  requiredRoles: string[];
}
// La idea para las rutas autorizadas las saqué de este artículo: https://www.tuckerblackwell.com/handle-auth-with-react-router-and-typescript/
// Yo lo he adapatado ya que en vez de usar el localstorage he usado el context para almacenar token y role
export const AuthRoute = ({Component, path, exact = false, requiredRoles}: Props): JSX.Element => {
  const message = 'Please log in to view this page';
  const { token, role } = useContext(SessionContext);
  const userHasRequiredRole = requiredRoles.includes(role);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        token != '' && userHasRequiredRole ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: NonAuthRoutes.nonAuth,
              state: {
                message,
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
};
