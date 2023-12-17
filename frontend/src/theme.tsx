import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#607D8B', // Blue-gray primary color
    },
    secondary: {
      main: '#FF4081', // Pink secondary color
    },
    background: {
      default: '#ECEFF1', // Light blue-gray background color
      paper: '#FFFFFF', // White paper color
    },
    text: {
      primary: '#37474F', // Dark blue-gray text color
      secondary: '#78909C', // Lighter blue-gray text color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  },
});
