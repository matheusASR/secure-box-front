import React, { createContext, useState } from 'react';

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  

  return (
    <RegisterContext.Provider value={{  }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterProvider, RegisterContext };