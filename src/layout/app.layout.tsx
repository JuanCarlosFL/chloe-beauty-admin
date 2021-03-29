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

export const AppLayout: React.FC = props => {
  const { children } = props;
  const { login } = React.useContext(SessionContext);
  const history = useHistory();

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
            onClick={() => history.push(NonAuthRoutes.login)}
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
