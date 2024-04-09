import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../services/api";

interface HomeContextType {
  getCages: () => void;
  cages: any[];
  setCages: React.Dispatch<React.SetStateAction<any[]>>;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
  handleStartAllocation: (cageId: any) => void;
  isLocalOpen: boolean;
  setIsLocalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCage: any;
  setSelectedCage: React.Dispatch<React.SetStateAction<any>>;
}

const HomeContext = createContext<HomeContextType>({} as HomeContextType);

const HomeProvider = ({ children }: any) => {
  const [cages, setCages] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState<any>(false);
  const [isLocalOpen, setIsLocalOpen] = useState<any>(false);
  const [selectedCage, setSelectedCage] = useState<any>({});

  const generateToastConfig = (message: any) => {
    return [
      message,
      {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      },
    ];
  };

  function formatDateTime(timestamp: any) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const getCages = async () => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.get("/cages?location=shoppcentro", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        setCages(response.data);
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao buscar gaiolas do local: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleStartAllocation = async (cageId: any) => {
    const payload = {
      initialDatetime: formatDateTime(Date.now()),
    };
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      await api.post(`/allocations/${cageId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const [message, toastConfig] = generateToastConfig(
        "Alocação iniciada! Acompanhe-a na seção 'Em uso'."
      );
      Toast.show(message, toastConfig);
      getCages();
      handleCloseModal();
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao iniciar alocação: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        getCages,
        cages,
        setCages,
        isModalVisible,
        setIsModalVisible,
        handleCloseModal,
        handleStartAllocation,
        selectedCage,
        isLocalOpen,
        setIsLocalOpen,
        setSelectedCage,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
