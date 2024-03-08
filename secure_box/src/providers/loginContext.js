import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [logged, setLogged] = useState(false)

  return (
    <LoginContext.Provider value={{ setLogged, logged }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };