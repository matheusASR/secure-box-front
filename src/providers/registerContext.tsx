import React, { createContext, ReactNode } from "react";

interface RegisterContextType {
  // Defina aqui os tipos para os valores que você deseja armazenar no contexto
}

const RegisterContext = createContext<RegisterContextType>({} as RegisterContextType);

interface RegisterProviderProps {
  children: ReactNode;
}

const RegisterProvider: React.FC<RegisterProviderProps> = ({ children }) => {
  // Implemente o provedor conforme necessário
  return (
    <RegisterContext.Provider value={{ /* Insira os valores do contexto aqui */ }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterProvider, RegisterContext };

