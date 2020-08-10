import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const dark = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    type: "dark",
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

export default dark;
