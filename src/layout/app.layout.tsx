import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SessionContext } from 'core/session-context';
import { AuthRoutes, NonAuthRoutes } from 'core/auth';
import * as classes from './app.layout.styles';
// Componente que pinta el layout de nuestra aplicación
export const AppLayout: React.FC = props => {
  // Children es el contenido que va dentro del layout que es el componente que lo llama
  const { children } = props;
  // Traemos lo neceario del context
  const { login, updateLogin, updateRole } = React.useContext(SessionContext);
  // Guardamos el historial del navegador
  const history = useHistory();
  // Mostramos un appBar como header y otro como footer, dentro va el contenido
  // En el header va el usuario logado y el botón para salir de la aplicación
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar
          variant="dense"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <IconButton
            style={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            aria-label="Menu"
            onClick={() => history.push(AuthRoutes.menu)}
          >
            <AccountCircle />

            <Typography
              variant="h6"
              color="inherit"
              style={{ marginLeft: '10px' }}
            >
              {login}
            </Typography>
          </IconButton>

          <IconButton
            style={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            aria-label="Menu"
            onClick={() =>
             {
                updateRole('no role');
                updateLogin('no user');
                history.push(NonAuthRoutes.login);
              }
            }
          >
            <ExitToAppIcon />
            <Typography
              variant="h6"
              color="inherit"
              style={{ marginLeft: '10px' }}
            >
              Salir
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content} style={{ flexGrow: 1, width: '100%' }}>
        {children}
      </main>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Typography color="inherit" align="center">
            &copy; Juan Carlos Fuentes Lamas - {new Date().getFullYear()}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
