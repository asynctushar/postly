import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/auth/AuthProvider';
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { SnackbarProvider } from './context/snackbar/SnackbarProvider';


createRoot(document.getElementById('root')).render(

  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SnackbarProvider>
  </ThemeProvider>
);
