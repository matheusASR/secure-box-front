import React, { createContext, ReactNode } from "react";

interface MenuContextType {
}

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

interface MenuProviderProps {
  children: ReactNode;
}

const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {

  return (
    <MenuContext.Provider value={{  }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuProvider, MenuContext };
