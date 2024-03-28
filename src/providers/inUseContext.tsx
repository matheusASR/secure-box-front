import React, { createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../services/api";

interface InUseContextType {
  formatDateTime: (timestamp: any) => string;
  handlePayment: (finalTime: any, initialTime: any) => string;
  finalDatetime: string;
  setFinalDatetime: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  showFinishContent: boolean;
  setShowFinishContent: React.Dispatch<React.SetStateAction<boolean>>;
  getAllocationsNotFinished: () => void;
  allocationsNotFinished: any[];
  finishAllocation: (allocation: any) => void;
  handleFinishModal: (allocation: any) => void;
  showFinishModal: boolean;
  allocationSelected: any;
  handleCloseFinishModal: () => void;
  unlockCage: (allocation: any) => void;
  finishPayAllocation: (allocation: any) => void;
}

const InUseContext = createContext<any>({} as InUseContextType);

interface InUseProviderProps {
  children: ReactNode;
}

const InUseProvider: React.FC<InUseProviderProps> = ({ children }) => {
  const [showCageContent, setShowCageContent] = useState<boolean>(true);
  const [allocationsNotFinished, setAllocationsNotFinished] = useState<any[]>(
    []
  );
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [allocationSelected, setAllocationSelected] = useState<any>({});
  const [finalDatetime, setFinalDatetime] = useState("");
  const [price, setPrice] = useState("");
  const [user, setUser] = useState<any>({});

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

  const formatDateTime = (timestamp: any) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handlePayment = (finalTime: any, initialTime: any): any => {
    const parseDate = (dateTimeString: any): any => {
      const [day, month, year, hour, minute, second] =
        dateTimeString.split(/[\s/,:]+/);
      return new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      );
    };

    const differenceInMinutes: any =
      Math.abs(
        parseDate(finalTime).getTime() - parseDate(initialTime).getTime()
      ) /
      (1000 * 60);

    const basePrice: any = 5;
    const additionalHourPrice: any = 2.5;

    if (differenceInMinutes <= 60) {
      return `R$${basePrice.toFixed(2)}`;
    } else {
      const additionalHours: any = Math.ceil((differenceInMinutes - 60) / 60);
      const totalPrice: any = basePrice + additionalHours * additionalHourPrice;
      return `R$${totalPrice.toFixed(2)}`;
    }
  };

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
          setUser(responseProfile.data);
          const responseAllocations = await api.get(
            `/allocations/${responseProfile.data.id}/inuse`
          );
          if (responseAllocations.status === 200) {
            setAllocationsNotFinished(responseAllocations.data);
          }
        } catch (error: any) {
          const [message, toastConfig] = generateToastConfig(
            `Ocorreu um erro ao buscar alocações em uso: ${error.response.data.message}`
          );
          Toast.show(message, toastConfig);
        }
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao buscar dados do usuário: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  const handleFinishModal = (allocation: any) => {
    setShowFinishModal(true);
    setAllocationSelected(allocation);
  };

  const handleCloseFinishModal = () => {
    setShowFinishModal(false);
  };

  const unlockCage = async (allocation: any) => {
    const allocationData = {
      finished: true,
    };

    try {
      const responseUnlock = await api.patch(`/allocations/${allocation.id}/`, allocationData);
      if (responseUnlock.status === 200) {
        const [message, toastConfig] = generateToastConfig(
          "Gaiola destravada com sucesso! Você já pode retirar seus pertences."
        );
        Toast.show(message, toastConfig);
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao destravar a gaiola: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }

    const cageData = {
      availability: true
    };

    try {
      await api.patch(`/cages/${allocation.cageId}/`, cageData);
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao disponibilizar gaiola: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }

    getAllocationsNotFinished();
  };

  const finishPayAllocation = async (
    allocation: any,
    finalDatetime: any,
    price: any
  ) => {
    try {
      const patchData = {
        price: price,
      };
      const response = await api.patch(`/wallets/${user.id}`, patchData);
      if (response.status === 200) {
        const data = {
          finalDatetime: finalDatetime,
          price: price,
          paymentStatus: true,
        };

        try {
          const responseFinish =await api.patch(`/allocations/${allocation.id}/`, data);
          if (responseFinish.status === 200) {
            const [message, toastConfig] = generateToastConfig(
              "Alocação finalizada com sucesso! Você já pode destravar a gaiola."
            );
            Toast.show(message, toastConfig);
            handleCloseFinishModal();
          }
          
        } catch (error: any) {
          const [message, toastConfig] = generateToastConfig(
            `Ocorreu um erro ao finalizar alocação: ${error.response.data.message}`
          );
          Toast.show(message, toastConfig);
        }
        getAllocationsNotFinished();
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro no pagamento da alocação: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
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
        handleFinishModal,
        showFinishModal,
        allocationSelected,
        handleCloseFinishModal,
        unlockCage,
        finishPayAllocation,
        setFinalDatetime,
        finalDatetime,
        price,
        setPrice,
        user
      }}
    >
      {children}
    </InUseContext.Provider>
  );
};

export { InUseProvider, InUseContext };
