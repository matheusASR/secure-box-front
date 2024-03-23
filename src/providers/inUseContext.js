import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../services/api";

const InUseContext = createContext();

const InUseProvider = ({ children }) => {
  const [showCageContent, setShowCageContent] = useState(true);
  const [allocationsNotFinished, setAllocationsNotFinished] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [allocationSelected, setAllocationSelected] = useState({});

  const generateToastConfig = (message) => {
    return [message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    }];
  };

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
      const [day, month, year, hour, minute, second] =
        dateTimeString.split(/[\s/,:]+/);
      return new Date(year, month - 1, day, hour, minute, second);
    };

    const differenceInMinutes =
      Math.abs(parseDate(finalTime) - parseDate(initialTime)) / (1000 * 60);

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

  const getAllocationsNotFinished = async () => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const responseProfile = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseProfile.status === 200) {
        try {
          const responseAllocations = await api.get(
            `/allocations/${responseProfile.data.id}/userNotFinished`
          );
          if (responseAllocations.status === 200) {
            setAllocationsNotFinished(responseAllocations.data);
          }
        } catch (error) {
          const [message, toastConfig] = generateToastConfig(
            `Ocorreu um erro ao buscar alocações em uso: ${error.response.data.message}`
          );
          Toast.show(message, toastConfig);
        }
      }
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao buscar dados do usuário: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  const finishAllocation = async (allocation) => {
    const finalDatetime = Date.now();
    const finalDatetimeFormatted = formatDateTime(finalDatetime);
    const timeUsed = handlePayment(finalDatetimeFormatted, allocation.initialDatetime)
    const formData = {
      finalDatetime: finalDatetimeFormatted,
      price: timeUsed,
      pressed: true,
    };

    try {
      await api.patch(`/allocations/${allocation.id}/`, formData);
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao finalizar alocação: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }

    getAllocationsNotFinished();
  };

  const handlePaymentModal = (allocation) => {
    setShowPaymentModal(true);
    setAllocationSelected(allocation);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const unlockCage = async (allocation) => {
    const formData = {
      unlocked: true,
    };

    try {
      await api.patch(`/allocations/${allocation.id}/`, formData);
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao abrir a gaiola: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }

    getAllocationsNotFinished();

    setTimeout(async () => {
      const allocationData = {
        finished: true,
      };

      try {
        await api.patch(`/allocations/${allocation.id}/`, allocationData);
      } catch (error) {
        const [message, toastConfig] = generateToastConfig(
          `Ocorreu um erro ao finalizar alocação: ${error.response.data.message}`
        );
        Toast.show(message, toastConfig);
      }

      const cageData = {
        availability: true,
      };

      try {
        await api.patch(`/cages/${allocation.cageId}/`, cageData);
      } catch (error) {
        const [message, toastConfig] = generateToastConfig(
          `Ocorreu um erro ao disponibilizar gaiola: ${error.response.data.message}`
        );
        Toast.show(message, toastConfig);
      }
      getAllocationsNotFinished();
    }, 60000);
  };

  const handlePaymentConfirmed = async (allocation) => {
    const formData = {
      paymentStatus: true,
    };

    try {
      const response = await api.patch(`/allocations/${allocation.id}/`, formData);
      if (response.status === 200) {
        const [message, toastConfig] = generateToastConfig(
          "Pagamento concluído! Você já pode destravar a gaiola."
        );
        Toast.show(message, toastConfig);
        handleClosePaymentModal()
      }
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro no pagamento da alocação: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }

    getAllocationsNotFinished();
  };

  return (
    <InUseContext.Provider
      value={{
        formatDateTime,
        handlePayment,
        showCageContent,
        setShowCageContent,
        getAllocationsNotFinished,
        allocationsNotFinished,
        finishAllocation,
        handlePaymentModal,
        showPaymentModal,
        allocationSelected,
        handleClosePaymentModal,
        unlockCage,
        handlePaymentConfirmed
      }}
    >
      {children}
    </InUseContext.Provider>
  );
};

export { InUseProvider, InUseContext };
