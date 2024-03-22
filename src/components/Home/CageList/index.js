import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import styles from "./styles";
import CageAllocationModal from "../CageModal/CageAllocationModal";
import { api } from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InUseContext } from "../../../providers/inUseContext";
import Toast from "react-native-root-toast";

const CageList = () => {
  const [selectedCage, setSelectedCage] = useState({});
  const [cages, setCages] = useState([]);
  const [allocationStarted, setAllocationStarted] = useState(false);
  const { formatDateTime, isModalVisible, setIsModalVisible } = useContext(InUseContext);

  useEffect(() => {
    const getCages = async () => {
      try {
        const response = await api.get("/cages/");
        if (response.status === 200) {
          setCages(response.data);
        }
      } catch (error) {
        Toast.show(`Erro ao buscar gaiolas do local: ${error}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    };

    getCages();
  }, [isModalVisible]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
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

  const handleStartAllocation = async (cageId) => {
    const payload = {
      initialDatetime: formatDateTime(Date.now())
    }
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.post(`/allocations/${cageId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        setAllocationStarted(true)
      }
    } catch (error) {
      Toast.show(`Erro ao buscar gaiolas do local: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  return (
    <ScreenPatternStack>
      <ScrollView style={styles.container}>
        <View style={styles.cardsContainer}>
          {cages.map((cage) => renderCageCard(cage))}
        </View>
      </ScrollView>
      <CageAllocationModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        cage={selectedCage}
        onStartAllocation={handleStartAllocation}
        allocationStarted={allocationStarted}
      />
    </ScreenPatternStack>
  );
};

export default CageList;
