import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#FFF',
      // Whitish-Grey background
      // "default": "#fafafa",
      paper: '#fff',
      // "emphasis": "#E8EAF6",
      // "secondary": "#C5CAE9",
      // "header": "#121037"
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    text: {
      primary: '#1A237E',
      secondary: '#5C6BC0',
      hint: '#9FA8DA',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    primary: {
      main: '#304FFE',
      light: '#536DFE',
      dark: '#1A237E',
    },
    secondary: {
      main: '#FFAB00',
      light: '#ffd740',
      dark: '#ff8f00',
    },
    contrastThreshold: 1.8,
  },
  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ],
});

export default theme;
