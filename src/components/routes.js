import React from 'react';
import { Redirect } from '@reach/router';
import { AuthConsumer } from './auth/auth-context';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) =>
      isAuth ? <Component {...rest} /> : <Redirect from="" to="login" noThrow />
    }
  </AuthConsumer>
);

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);
