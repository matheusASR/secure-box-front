import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import styles from "./styles";
import CageAllocationModal from "../CageAllocationModal";
import { HomeContext } from "../../../providers/homeContext";
import { colors } from "../../../styles";

const CageList = () => {
  const {
    getCages,
    cages,
    isModalVisible,
    handleStartAllocation,
    handleCloseModal,
    selectedCage,
    setSelectedCage,
    setIsModalVisible
  } = useContext<any>(HomeContext);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await getCages();
  //     } catch (error) {
  //       console.error("Erro ao obter gaiolas:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const renderCageCard = (cage: any) => {
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

  return (
    <ScreenPatternStack>
      {loading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.cardsContainer}>
            {cages
              .sort((a: any, b: any) => a.id - b.id) 
              .map((cage: any) => renderCageCard(cage))}
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
