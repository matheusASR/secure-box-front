import React, { createContext, useState } from "react";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [qrcode, setQrcode] = useState(false);

  return (
    <HomeContext.Provider
      value={{
        setQrcode,
        qrcode,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };

