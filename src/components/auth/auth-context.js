import React, { useState, useMemo } from 'react';

export const AuthContext = React.createContext({
  login: () => {},
  isAuth: false,
});

const AuthProvider = (props) => {
  const [isAuth, setAuth] = useState(false);
  const login = () => {
    setTimeout(() => setAuth(true), 1000);
  };
  const value = useMemo(() => ({isAuth, login}), [isAuth]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
