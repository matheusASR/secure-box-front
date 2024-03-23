import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import styles from "./styles";
import CageAllocationModal from "../CageAllocationModal";
import { HomeContext } from "../../../providers/homeContext";
import { colors } from "../../../styles";

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

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCages();
      } catch (error) {
        console.error("Erro ao obter gaiolas:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  return (
    <ScreenPatternStack>
      {loading ? ( 
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : ( 
        <ScrollView style={styles.container}>
          <View style={styles.cardsContainer}>
            {cages.map((cage) => renderCageCard(cage))}
          </View>
        </ScrollView>
      )}
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

