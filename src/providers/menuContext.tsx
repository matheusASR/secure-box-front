import React, { createContext, ReactNode, useState } from "react";

interface MenuContextType {
  // Defina aqui os tipos para os valores que você deseja armazenar no contexto
}

const MenuContext = createContext<MenuContextType>({} as MenuContextType);

interface MenuProviderProps {
  children: ReactNode;
}

const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  // Implemente o provedor conforme necessário
  return <MenuContext.Provider value={{ /* Insira os valores do contexto aqui */ }}>{children}</MenuContext.Provider>;
};

export { MenuProvider, MenuContext };
