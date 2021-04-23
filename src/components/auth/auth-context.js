import React, { useState } from 'react';

const AuthContext = React.createContext({ login: () => {}, isAuth: false });

const AuthProvider = (props) => {
  const [isAuth, setAuth] = useState(false);
  const login = () => {
    setTimeout(() => setAuth(true), 1000);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
