import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../services/api";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../components/Home/CageList/styles"
import { LoginContext } from "./loginContext";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [qrcode, setQrcode] = useState(false);
  const [cages, setCages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCage, setSelectedCage] = useState({})
  const { setLogged } = useContext(LoginContext)

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@secbox:TOKEN');
      if (!token) {
        setLogged(false)
      }
    } catch (error) {
      Toast.show(`Erro ao verificar token do usuário: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      setLogged(false)
    }
  };

  const handleQrcode = () => {
    setQrcode(true);
  };

  const backHome = () => {
    setQrcode(false);
  };

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

  const getCages = async () => {
    try {
      const response = await api.get("/cages/");
      if (response.status === 200) {
        setCages(response.data);
      }
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao buscar gaiolas do local: ${error}`
      );
      Toast.show(message, toastConfig);
    }
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
      const responseAllocation = await api.post(`/allocations/${cageId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseAllocation.status === 201) {
        try {
          const payload = {
            availability: false
          }
          await api.patch(`/cages/${cageId}`, payload)
        } catch (error) {
          const [message, toastConfig] = generateToastConfig(
            `Ocorreu um erro ao atualizar gaiola: ${error}`
          );
          Toast.show(message, toastConfig);
        }
      }
      const [message, toastConfig] = generateToastConfig(
        "Alocação iniciada! Acompanhe-a na seção 'Em uso'."
      );
      Toast.show(message, toastConfig);
      handleCloseModal()
    } catch (error) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao iniciar alocação: ${error}`
      );
      Toast.show(message, toastConfig);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        setQrcode,
        qrcode,
        renderCageCard,
        getCages,
        cages,
        setCages,
        isModalVisible,
        setIsModalVisible,
        handleCloseModal,
        handleStartAllocation,
        selectedCage,
        checkToken,
        handleQrcode,
        backHome
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
