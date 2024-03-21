import React, { createContext, useState } from "react";

const InUseContext = createContext();

const InUseProvider = ({ children }) => {
  const [showCageContent, setShowCageContent] = useState(true);

  function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function handlePayment(timeUsed) {
    const baseValue = 5;
    const taxAddHour = 2.5;

    if (timeUsed <= 60) {
        return `R$${baseValue}`;
    } else {
        const addHours = Math.ceil((timeUsed - 60) / 60); 
        return `R$${baseValue + (addHours * taxAddHour)}`;
    }
  }

  return (
    <InUseContext.Provider
      value={{
        formatDateTime,
        handlePayment,
        showCageContent,
        setShowCageContent
      }}
    >
      {children}
    </InUseContext.Provider>
  );
};

export { InUseProvider, InUseContext };