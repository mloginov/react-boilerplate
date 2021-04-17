import React from 'react';
import { Router, Link } from "@reach/router"

import './styles/app.scss';

import { AuthProvider } from './components/auth/auth-context';
import { ProtectedRoute, PublicRoute } from './components/routes';
import Navigation from './components/navigation';

import Accounts from './pages/accounts';
import Landing from './pages/landing';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navigation />
        <Router>
          <ProtectedRoute path="/accounts" component={Accounts} />
          <PublicRoute path="/" component={Landing} />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
