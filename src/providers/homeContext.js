import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../services/api";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../components/Home/CageList/styles";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [cages, setCages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedCage, setSelectedCage] = useState({});
  const [qrCodeData, setQrCodeData] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleBarCodeRead = async (event) => {
    if (event.data) {
      setQrCodeData(event.data);

      try {
        const qrCodeUrl = event.data;
        const response = await api.get(qrCodeUrl);

        if (response.status === 200) {
          setRequestStatus(200);
        } else {
          setRequestStatus(response.status);
        }
      } catch (error) {
        const [message, toastConfig] = generateToastConfig(
          `Ocorreu um erro ao buscar gaiolas do local: ${error.response.data.message}`
        );
        Toast.show(message, toastConfig);
        setRequestStatus(null);
      }

      handleCloseCamera();
    }
  };

  const generateToastConfig = (message) => {
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

  const getCages = async () => {
    try {
      const response = await api.get("/cages/");
      if (response.status === 200) {
        setCages(response.data);
      }
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao buscar gaiolas do local: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  const renderCageCard = (cage) => {
    return (
      <View key={cage.id} style={styles.card}>
        <Text style={styles.cardText}>Gaiola {cage.id}</Text>
        <Text style={styles.cardText}>
          {cage.availability ? "Disponível" : "Em uso"}
        </Text>
        {cage.availability && (
          <TouchableOpacity
            style={styles.startAllocationBtn}
            onPress={() => {
              setSelectedCage({ ...cage });
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Iniciar Alocação</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleStartAllocation = async (cageId) => {
    const payload = {
      initialDatetime: formatDateTime(Date.now()),
    };
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const responseAllocation = await api.post(
        `/allocations/${cageId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responseAllocation.status === 201) {
        try {
          const payload = {
            availability: false,
          };
          await api.patch(`/cages/${cageId}`, payload);
        } catch (error) {
          const [message, toastConfig] = generateToastConfig(
            `Ocorreu um erro ao atualizar gaiola: ${error.response.data.message}`
          );
          Toast.show(message, toastConfig);
        }
      }
      const [message, toastConfig] = generateToastConfig(
        "Alocação iniciada! Acompanhe-a na seção 'Em uso'."
      );
      Toast.show(message, toastConfig);
      getCages();
      handleCloseModal();
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao iniciar alocação: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        renderCageCard,
        getCages,
        cages,
        setCages,
        isModalVisible,
        setIsModalVisible,
        handleCloseModal,
        handleStartAllocation,
        selectedCage,
        isCameraOpen,
        setIsCameraOpen,
        requestStatus,
        qrCodeData,
        handleBarCodeRead,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
