import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from './components/auth/auth-context';
import { ProtectedRoute } from './components/routes';
import Navigation from './components/navigation';

import store from './store/store';

import Accounts from './pages/accounts';
import Landing from './pages/landing';
import AuthenticationRequired from './pages/auth-required';

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <div style={{display: 'flex'}}>
        <CssBaseline />
        <AuthProvider>
          <Navigation />
          <main style={{flexGrow: 1, backgroundColor: theme.palette.background.default, padding: theme.spacing(3)}}>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/accounts" element={<Accounts />} />
              </Route>
              <Route path="/login" element={<AuthenticationRequired />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </main>
        </AuthProvider>
      </div>
    </Provider>
  </ThemeProvider>
);

export default App;
