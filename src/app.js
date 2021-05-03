import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from './components/auth/auth-context';
import { ProtectedRoute, PublicRoute } from './components/routes';
import Navigation from './components/navigation';

import store from './store/store';

import Accounts from './pages/accounts';
import Landing from './pages/landing';

import { fetchRequests } from './store/requests-slice';

store.dispatch(fetchRequests());

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
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
