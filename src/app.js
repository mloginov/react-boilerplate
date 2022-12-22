import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthProvider } from './components/auth/auth-context';
import { ProtectedRoute, PublicRoute } from './components/routes';
import Navigation from './components/navigation';

import store from './store/store';

import Accounts from './pages/accounts';
import Landing from './pages/landing';

const theme = createTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <div style={{display: 'flex'}}>
        <CssBaseline />
        <AuthProvider>
          <Navigation />
          <main style={{flexGrow: 1, backgroundColor: theme.palette.background.default, padding: theme.spacing(3)}}>
            <Router>
              <ProtectedRoute path="/accounts" component={Accounts} />
              <PublicRoute path="/" component={Landing} />
            </Router>
          </main>
        </AuthProvider>
      </div>
    </Provider>
  </ThemeProvider>
);

export default App;
