import React, { createContext, useState } from "react";

const InUseContext = createContext();

const InUseProvider = ({ children }) => {
  const [inUse, setInUse] = useState([]);
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
    if (timeUsed <= 30) {
      return "Valor a pagar: R$ 5,00";
    } else if (timeUsed >= 31 && timeUsed <= 119) {
      return "Valor a pagar: R$ 7,50";
    } else if (timeUsed >= 120 && timeUsed <= 179) {
      return "Valor a pagar: R$ 10,00";
    } else {
      return "Valor a pagar: R$ 15,00";
    }
  }

  return (
    <InUseContext.Provider
      value={{
        inUse,
        setInUse,
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