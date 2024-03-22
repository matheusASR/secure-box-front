import React, { createContext, useState } from "react";

const InUseContext = createContext();

const InUseProvider = ({ children }) => {
  const [showCageContent, setShowCageContent] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  function handlePayment(finalTime, initialTime) {
    const parseDate = (dateTimeString) => {
        const [day, month, year, hour, minute, second] = dateTimeString.split(/[\s/,:]+/);
        return new Date(year, month - 1, day, hour, minute, second);
    };

    const differenceInMinutes = Math.abs(parseDate(finalTime) - parseDate(initialTime)) / (1000 * 60);

    const basePrice = 5;
    const additionalHourPrice = 2.5;

    if (differenceInMinutes <= 60) {
        return `R$${basePrice.toFixed(2)}`;
    } else {
        const additionalHours = Math.ceil((differenceInMinutes - 60) / 60);
        const totalPrice = basePrice + additionalHours * additionalHourPrice;
        return `R$${totalPrice.toFixed(2)}`;
    }
}

  return (
    <InUseContext.Provider
      value={{
        formatDateTime,
        handlePayment,
        showCageContent,
        setShowCageContent,
        setIsModalVisible,
        isModalVisible,
      }}
    >
      {children}
    </InUseContext.Provider>
  );
};

export { InUseProvider, InUseContext };
