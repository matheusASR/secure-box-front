import React, { createContext, useState } from 'react';

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [qrcode, setQrcode] = useState(false);
  const [inUse, setInUse] = useState([]);

  return (
    <HomeContext.Provider value={{ setQrcode, qrcode, inUse, setInUse }}>
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };