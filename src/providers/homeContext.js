import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../services/api";
import { InUseContext } from "./inUseContext";
import { ToastContext } from "./toastContext";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const { generateToastConfig } = useContext(ToastContext);
  const { formatDateTime } = useContext(InUseContext);
  const [qrcode, setQrcode] = useState(false);
  const [cages, setCages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allocationSelected, setAllocationSelected] = useState({});

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
      const toastConfig = generateToastConfig(
        `Erro ao buscar gaiolas do local: ${error}`
      );
      Toast.show(toastConfig);
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
      const allocation = await api.post(`/allocations/${cageId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllocationSelected(allocation);
    } catch (error) {
      const toastConfig = generateToastConfig(
        `Erro ao buscar gaiolas do local: ${error}`
      );
      Toast.show(toastConfig);
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
        allocationSelected,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeProvider, HomeContext };
