import React, { useContext, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { cages } from "./utils";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import { InUseContext } from "../../../providers/inUseContext";
import styles from "./styles";
import CageAllocationModal from "../CageModal/CageAllocationModal";

const CageList = () => {
  const { setInUse, inUse } = useContext(InUseContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCage, setSelectedCage] = useState({});

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderCageCard = (cage) => {
    return (
      <View key={cage.number} style={styles.card}>
        <Text style={styles.cardText}>Gaiola {cage.number}</Text>
        <Text style={styles.cardText}>
          {cage.inUse ? "Em uso" : "Disponível"}
        </Text>
        {!cage.inUse && (
          <TouchableOpacity
            style={styles.startAllocationBtn}
            onPress={() => {
              setSelectedCage({...cage});
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
