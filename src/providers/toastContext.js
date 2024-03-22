import React, { createContext } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const generateToastConfig = (message) => {
    return {
      message: message,
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    };
  };

  return (
    <ToastContext.Provider value={{ generateToastConfig }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
