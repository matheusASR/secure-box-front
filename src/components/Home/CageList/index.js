import React, { useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import styles from "./styles";
import CageAllocationModal from "../CageModal/CageAllocationModal";
import { HomeContext } from "../../../providers/homeContext";

const CageList = () => {
  const {
    allocationSelected,
    renderCageCard,
    getCages,
    cages,
    isModalVisible,
    handleStartAllocation,
    handleCloseModal,
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
        allocation={allocationSelected}
        onStartAllocation={handleStartAllocation}
      />
    </ScreenPatternStack>
  );
};

export default CageList;
