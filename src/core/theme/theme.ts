import merge from 'lodash.merge';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from './theme.model';

const defaultTheme = createMuiTheme();

export const theme: Theme = merge(defaultTheme, {
  palette: {
    primary: {
      light: '#d28da4',
      main: '#dd81a0',
      dark: '#d54c79',
      contrastText: '#fff',
    },
    secondary: {
      light: '#6bbef9',
      main: '#2196f3',
      dark: '#137fd9',
    },
    success: {
      main: '#43a047',
    },
    info: {
      main: '#1976d2',
    },
    warning: {
      main: '#ffa000',
    },
    table: {
      row: {
        main: '#ddd',
      },
    },
  },
} as Theme);
