import React from 'react';
import { Router } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from './components/auth/auth-context';
import { ProtectedRoute, PublicRoute } from './components/routes';
import Navigation from './components/navigation';

import Accounts from './pages/accounts';
import Landing from './pages/landing';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AuthProvider>
        <Navigation />
        <main className={classes.content}>
          <Router>
            <ProtectedRoute path="/accounts" component={Accounts} />
            <PublicRoute path="/" component={Landing} />
          </Router>
        </main>
      </AuthProvider>
    </div>
  );
};

export default App;
