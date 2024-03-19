import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import { InUseContext } from "../../../providers/inUseContext";
import styles from "./styles";
import CageAllocationModal from "../CageModal/CageAllocationModal";
import { api } from "../../../services/api";

const CageList = () => {
  const { setInUse, inUse } = useContext(InUseContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCage, setSelectedCage] = useState({});
  const [cages, setCages] = useState([]);

  useEffect(() => {
    const getCages = async () => {
      try {
        const response = await api.get("/cages");
        if (response && response.data && response.statusText === "OK") {
          // toast
          setCages(response.data);
        }
      } catch (error) {
        // toast
        console.log("busca cages erro:", error.response.data.message);
      }
    };

    getCages();
  }, []);

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

  const handleStartAllocation = (cage) => {
    cage.initialTime = Date.now();
    setInUse([...inUse, cage]);
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
      />
    </ScreenPatternStack>
  );
};

export default CageList;
