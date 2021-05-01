import { Theme as DefaultTheme } from '@material-ui/core/styles';
import {
  Palette as DefaultPalette,
  PaletteColor,
} from '@material-ui/core/styles/createPalette';
// Seleccionamos la paleta para el theme
interface Palette extends DefaultPalette {
  table: {
    row: PaletteColor;
  };
}

export interface Theme extends Omit<DefaultTheme, 'palette'> {
  palette: Palette;
}
