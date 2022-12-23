import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext({
  login: () => {},
  isAuth: false,
});

const AuthProvider = (props) => {
  const [isAuth, setAuth] = useState(false);
  const navigate = useNavigate()
  const login = () => {
    setTimeout(() => {
      setAuth(true)
      navigate('/accounts')
    }, 1000);
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
