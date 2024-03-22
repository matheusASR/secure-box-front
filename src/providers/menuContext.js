import React, { createContext, useState } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  return <MenuContext.Provider value={{}}>{children}</MenuContext.Provider>;
};

export { MenuProvider, MenuContext };
