import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './styles/components/App.css';

// Import providers
import { AuthProvider } from './context/AuthContext';
import { RBACProvider } from './context/RBACContext';

// Import router
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RBACProvider>
          <Router>
            <div className="App">
              <AppRouter />
            </div>
          </Router>
        </RBACProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;