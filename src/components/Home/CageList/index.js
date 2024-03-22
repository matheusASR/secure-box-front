import React, { useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import styles from "./styles";
import CageAllocationModal from "../CageAllocationModal";
import { HomeContext } from "../../../providers/homeContext";

const CageList = () => {
  const {
    renderCageCard,
    getCages,
    cages,
    isModalVisible,
    handleStartAllocation,
    handleCloseModal,
    selectedCage
  } = useContext(HomeContext);

  useEffect(() => {
    getCages();
  }, []);

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
        onStartAllocation={handleStartAllocation}
        cage={selectedCage}
      />
    </ScreenPatternStack>
  );
};

export default CageList;
