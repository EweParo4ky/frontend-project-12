import React, {
  createContext, useState, useContext, useMemo,
} from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
  });
  const logIn = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setUserData(data);
  };

  const logOut = () => {
    setUserData(null);
    localStorage.removeItem('userData');
  };

  const authData = useMemo(() => ({ userData, logIn, logOut }), [userData]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
